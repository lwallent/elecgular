import { GPixi } from '../Helpers/GPixi';
import { MPixi } from '../Helpers/MPixi';
import { ModelDisplayObject } from '../Interfaces';
// import { IPlacementLocator } from '../Placement/PlacementLocator';

// ... Inspired from https://github.com/mrgoonie/pixi-transform-tool/blob/master/js/plugins/pixi-transform-tool.js

// Stuff to do:
//
// * left and top drag handles are not yet implemented
// *
//
//

// tslint:disable:member-ordering

const TOOL_COLOR = 0x66FF66;
const TOOL_ALPHA = 0.8;

const CONTROL_SIZE = 10;
const RELATIVE_SCALE = 1;
export class TransformTool extends PIXI.Container {

    private target: ModelDisplayObject;
    private ghostLayer: PIXI.Graphics;

    private rotateLayer: PIXI.Container;
    private rotateControl: PIXI.Graphics;
    private rotateLine: PIXI.Graphics;

    private left: PIXI.Graphics;
    private right: PIXI.Graphics;
    private top: PIXI.Graphics;
    private bottom: PIXI.Graphics;

    constructor() {
        super();
        this.interactive = true;
        this.buttonMode = true;
        this.target = null;
        this.visible = false;
    }

    public clear() {
        for (let item of this.children) {
            this.removeChild(item);
            item.destroy();
            item = null;
        }
        this.target = null;

        this.visible = false;
    }

    private getToolScale(target) {
        const transform = new PIXI.Transform();
        target.worldTransform.decompose(transform);

        return transform.scale;
    }

    private getToolRotation(target) {
        const transform = new PIXI.Transform();
        target.worldTransform.decompose(transform);
        return transform.rotation;
    }

    private getSize(target) {
        const scale = this.getToolScale(target);
        const size = {
            width: target.width * scale.x,
            height: target.height * scale.y,
        };
        return size;
    }

    public reset() {
        this.apply(this.target);
    }

    public apply(target: ModelDisplayObject) {

        this.clear();
        this.target = target;
        GPixi.moveToTop(this);

        this.ghostLayer = new PIXI.Graphics();
        this.addDragTranslationHander(this.ghostLayer);

        const size = this.getSize(target);

        const addResizeControl = (name) => {
            const control = new PIXI.Graphics();
            control.beginFill(TOOL_COLOR, TOOL_ALPHA);
            control.drawRect(0, 0, CONTROL_SIZE, CONTROL_SIZE);
            control.interactive = true;
            control.buttonMode = true;
            control.name = name;
            this.ghostLayer.addChild(control);
            this.addDragResizeHandler(control);
            return control;

        };

        this.left  = addResizeControl('resizeLeft');
        this.right = addResizeControl('resizeRight');
        this.right.cursor = this.left.cursor = 'col-resize';

        this.top =  addResizeControl('resizeTop');
        this.bottom = addResizeControl('resizeBottom');
        this.top.cursor = this.bottom.cursor = 'row-resize';

        this.drawGhost(size.width, size.height);

        // let pivot = target.pivot;

        const pos = this.target.getGlobalPosition();
        const scale = this.getToolScale(target);
        const piv = new PIXI.Point(target.pivot.x * scale.x, target.pivot.y * scale.y);

        const pivotControl = new PIXI.Graphics();

        pivotControl.beginFill(TOOL_COLOR, TOOL_ALPHA);
        pivotControl.drawCircle(0, 0, CONTROL_SIZE / 2);
        pivotControl.interactive = true;
        pivotControl.buttonMode = true;
        this.ghostLayer.addChild(pivotControl);
        pivotControl.x =  piv.x;
        pivotControl.y =  piv.y;
        this.addDragPivot(pivotControl);

        this.rotateLayer = new PIXI.Container();

        const rot = this.getToolRotation(target);

        this.rotateLayer.rotation = rot;
        this.rotateLayer.pivot.x = piv.x;
        this.rotateLayer.pivot.y = piv.y;
        this.rotateLayer.x = pos.x;
        this.rotateLayer.y = pos.y;
        this.rotateLayer.addChild(this.ghostLayer);

         // rotate
        this.rotateControl = new PIXI.Graphics();
        this.rotateControl.beginFill(TOOL_COLOR, TOOL_ALPHA);
        this.rotateControl.drawCircle(0, 0, CONTROL_SIZE / 2);
        this.rotateControl.interactive = true;
        this.rotateControl.buttonMode = true;
        this.rotateLayer.addChild(this.rotateControl);
        this.rotateLine = new PIXI.Graphics();
        this.rotateLayer.addChild(this.rotateLine);

        this.addDragRotationHandle(this.rotateControl);
        this.addChild(this.rotateLayer);
        this.ghostLayer.interactive = true;
        this.ghostLayer.buttonMode = true;

        // show tool:
        this.visible = true;

        this.updateRotationHandle();
    }

    private drawGhost(w, h) {
        this.ghostLayer.clear();
        // if debug --->
        this.ghostLayer.beginFill(0xFFFF00, 0.2);
        // ghostLayer.beginFill(0xFFFF00, 0.0);

        this.ghostLayer.lineStyle(2, TOOL_COLOR, TOOL_ALPHA);
        this.ghostLayer.drawRect(0, 0, w, h);

        this.left.x = -CONTROL_SIZE / 2;
        this.left.y =  h / 2 - CONTROL_SIZE / 2;

        this.right.x = w - CONTROL_SIZE / 2;
        this.right.y =  h / 2 - CONTROL_SIZE / 2;

        this.top.x =  w / 2 - CONTROL_SIZE / 2;
        this.top.y =  -CONTROL_SIZE / 2;

        this.bottom.x =  w / 2 - CONTROL_SIZE / 2;
        this.bottom.y = h - CONTROL_SIZE / 2;
    }

    private updateRotationHandle() {
        this.rotateControl.x = this.rotateLayer.pivot.x ;
        this.rotateControl.y = this.rotateLayer.pivot.y - 100; // hardcoded handle length for now

        this.rotateLine.clear();
        this.rotateLine.lineStyle(1, TOOL_COLOR, TOOL_ALPHA);
        this.rotateLine.moveTo(this.rotateControl.x, this.rotateControl.y);
        this.rotateLine.lineTo(this.rotateLayer.pivot.x, this.rotateLayer.pivot.y);
    }

    private updatePivotPoint(point) {
        // The incoming pivot point is in GhostLayer coordinates.

        // As we change the objects pivot point  we also change its x/y origin
        // point. Therefore we need to update the position accordingly.

        // Where is the pivot point in tool coordinate space?
        const pivotInToolCoordinates = this.toLocal(point, this.ghostLayer);

        this.rotateLayer.pivot.x = point.x;
        this.rotateLayer.pivot.y = point.y;
        this.rotateLayer.x = pivotInToolCoordinates.x;
        this.rotateLayer.y = pivotInToolCoordinates.y;

        // HANDLE THE TARGET PIVOT/ORIGIN IN SIMILAR WAY
        const targetPivot = this.target.toLocal(point, this.ghostLayer);
        const originPosition = this.target.parent.toLocal(point, this.ghostLayer);

        this.target.pivot.x = targetPivot.x;
        this.target.pivot.y = targetPivot.y;
        this.target.x = originPosition.x;
        this.target.y = originPosition.y;

        this.updateRotationHandle();
    }

    //
    // PIVOT DRAGGING
    //
    private addDragPivot(ctrl) {
        let data = null;
        let newPivot = null;

        const dragStart = (event) => {
            event.stopPropagation();
            data = event.data;
            const start =  data.getLocalPosition(ctrl.parent); // get point local to ghostlayer
            ctrl.on('pointermove', dragMove);
        };

        const dragEnd = (event) => {
            event.stopPropagation();
            this.updatePivotPoint(newPivot);
            ctrl.off('pointermove', dragMove);
        };

        const dragMove = (event) => {
            event.stopPropagation();
            const mousePosition =  data.getLocalPosition(ctrl.parent);
            ctrl.position = mousePosition;
            newPivot = mousePosition;
        };

        // REGISTER HANDLERS
        ctrl.on('pointerdown', dragStart)
            .on('pointerup',   dragEnd)
            .on('pointerupoutside', dragEnd);
    }

    //
    // ROTATION HANDLE
    //
    private addDragRotationHandle(ctrl) {
        let data = null;

        const dragStart = (event) => {
            event.stopPropagation();
            data = event.data;
            ctrl.on('pointermove', dragMove);
        };

        const dragEnd = (event) => {
            event.stopPropagation();
            ctrl.off('pointermove', dragMove);
        };

        const dragMove = (event) => {
            event.stopPropagation();
            const position = data.getLocalPosition(ctrl.parent);
            let angle = MPixi.angleRadBetweenLineAndXaxis(position, {x: this.rotateLayer.pivot.x, y: this.rotateLayer.pivot.y});
            // The handle is always 90deg on the xaxis
            angle -= Math.PI / 2;
            this.target.rotation += angle;
            this.rotateLayer.rotation += angle;
        };

        // REGISTER HANDLERS
        ctrl.on('pointerdown', dragStart)
            .on('pointerup',   dragEnd)
            .on('pointerupoutside', dragEnd);
    }

    private addDragTranslationHander(ctrl) {
        let data = null;
        let startPos;

        const dragStart = (event) => {
            data = event.data;
            startPos = data.getLocalPosition(ctrl.parent);
            ctrl.on('pointermove', dragMove);
        };

        const dragEnd = (e) => {
            ctrl.off('pointermove', dragMove);
        };

        const dragMove = (e) => {
             const position = data.getLocalPosition(ctrl.parent);
             const dx = position.x - startPos.x;
             const dy = position.y - startPos.y;

             this.rotateLayer.x += dx;
             this.rotateLayer.y += dy;

             const delta = new PIXI.Point(dx, dy);
             const targetDelta = this.target.toLocal(delta, ctrl.parent);
             this.target.x += targetDelta.x;
             this.target.y += targetDelta.y;

          //   const suggestion = this.placement.suggestPlacement(this.target, data);
        };

        // REGISTER HANDLERS
        ctrl.on('pointerdown', dragStart)
            .on('pointerup',   dragEnd)
            .on('pointerupoutside', dragEnd);
    }

    private addDragResizeHandler(ctrl) {
        let data = null;
        let startPos;
        let startSize;
        let startTargetWidth;
        let startTargetHeight;

        const dragStart = (event) => {
            event.stopPropagation();
            data = event.data;
            startPos = data.getLocalPosition(ctrl.parent);
            ctrl.on('pointermove', dragMove);

            startSize =   this.getSize(this.target);

            const physical = this.target.getModel().physicalProperties;
            startTargetWidth = physical.width;
            startTargetHeight = physical.depth;
        };

        const dragEnd = (event) => {
            event.stopPropagation();
            ctrl.off('pointermove', dragMove);
        };

        const dragMove = (event) => {
             event.stopPropagation();
             const position = data.getLocalPosition(ctrl.parent);
             const dx = position.x - startPos.x;
             const dy = position.y - startPos.y;
             const delta = new PIXI.Point(dx, dy);
             const targetDelta = this.target.toLocal(delta, ctrl.parent);

             // WE HAVE ONLY IMPLEMENTED THE EASY ONES ...
             // FOR  NOW :-)

             if (ctrl.name === 'resizeRight') {
                this.drawGhost(startSize.width + dx, startSize.height);
                this.target.updateModel({physicalProperties: { width: startTargetWidth + targetDelta.x, depth: startTargetHeight }});
             } else if (ctrl.name === 'resizeLeft') {
                 console.log('NOT YET IMPLEMENTED ...');
              //  console.log('resize left ');
              //  console.log('SIZE CHANGE : ', -dx );
               // this.drawGhost(startSize.width-dx,startSize.height);
               // this.rotateLayer.x += dx
           //     this.target.updateModel({physicalProperties: { width: startTargetWidth, depth: startTargetHeight+targetDelta.y }});
             } else if (ctrl.name === 'resizeBottom') {
                this.drawGhost(startSize.width, startSize.height + dy);
                this.target.updateModel({physicalProperties: { width: startTargetWidth, depth: startTargetHeight + targetDelta.y }});
             } else if (ctrl.name === 'resizeTop') {
                    console.log('NOT YET IMPLEMENTED ...');
         //       this.drawGhost(startSize.width,startSize.height-dy);
           //     this.rotateLayer.y += dy
             //   this.target.updateModel({physicalProperties: { width: startTargetWidth, depth: startTargetHeight+targetDelta.y }});
             }
        };

        // REGISTER HANDLERS
        ctrl.on('pointerdown', dragStart)
            .on('pointerup',   dragEnd)
            .on('pointerupoutside', dragEnd);
    }
}

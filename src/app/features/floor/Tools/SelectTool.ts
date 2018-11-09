import { GPixi } from '../Helpers/GPixi';
import { DisplayObject } from 'pixi.js';
import * as _ from 'lodash';
import { GAPP } from '../pixi.component';

export interface ISelectionManager {
    onSelection(selected);

    onClear();
}

export class SelectTool extends PIXI.Container {
    private target: PIXI.Container;
    private selected: DisplayObject[] = [];

    private manager: any; // PIXI.interaction.InteractionManager;

    constructor(private selectionManager: ISelectionManager) {
        super();
        this.manager = GAPP.renderer.plugins.interaction;
    }

    public apply(target: PIXI.Container) {
        this.clear();
        this.target = target;

        GPixi.moveToTop(this);

        const ghostLayer = new PIXI.Graphics();

        // if debug --->      ghostLayer.beginFill(0xFFFF00, 0.2);
        ghostLayer.beginFill(0xFFFF00, 0.0);

        const root = GPixi.getRootContainer(this);
        const bounds = root.getLocalBounds();
        ghostLayer.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);

        this.addChild(ghostLayer);
        ghostLayer.interactive = true;
        ghostLayer.buttonMode = true;
        ghostLayer.cursor = 'default';

        this.addEventHandlers(ghostLayer);

        this.visible = true;
    }

    public clear() {
        for (let i = 0; i< this.children.length; i++){
            let item = this.children[i];
            this.removeChild(item);
            item.destroy();
            item = null;
        }
        this.target = null;
        this.visible = false;
    }

    // ==================================
    // EVENT HANDLING
    // ==================================

    private addEventHandlers(layer) {
        let data = null;
        // let start;
        // let selector;

        let onMouseDown = (event) => {
            event.stopPropagation();

            // MULTI SELECTION >>>

            // selector = new PIXI.Graphics();
            // start = event.data.getLocalPosition(this.parent);
            // this.addChild(selector);

            let hitObj = this.manager.hitTest(event.data.global, this.target);

            // No -> Clear selection
            if (hitObj == null) {
                this.selectionManager.onClear();
            } else {
                this.selectionManager.onSelection(hitObj);
            }

            data = event.data;

          // layer.on('pointermove', onDragMove);
        }

        // let onDragEnd = (event) => {

        //     data = null;

        //     this.removeChild(selector);
        //     layer.off('pointermove', onDragMove);
        // }

        // let onDragMove = (event) => {
        //     var latest = data.getLocalPosition(this.parent);

        //     let r = new PIXI.Rectangle(start.x,start.y, latest.x-start.x,latest.y-start.y);

        //     selector.clear();
        //     selector.lineStyle(2, 0x808080, 1);
        //     selector.drawShape(r);

        //     let collision  = GPixi.getCollidingChildren(selector.getBounds(), this.target);

        //     this.updateSelected(collision);
        // }

        layer.on('pointerdown', onMouseDown)
           //  .on('pointerup', onDragEnd)
           //  .on('pointerupoutside', onDragEnd)

    }

    // private updateSelected(newSelection: DisplayObject[]) {
    //     //we are only interested in those carrying a model (well rows do not have a model)
    //     let removed = _.difference(this.selected, newSelection);
    //     let added = _.difference(newSelection, this.selected);
    //     this.selected = newSelection;

    //     for (let i =0 ; i<removed.length; i++)  {
    //         this.eraseSelected(removed[i]);
    //     }

    //     for (let i =0 ; i<added.length; i++)  {
    //         this.drawSelected(added[i]);
    //     }
    // }

    // private drawSelected(dobj: DisplayObject) {
    //     let g = new PIXI.Graphics();
    //     g.beginFill(0x0000FF, 0.2);

    //     let bounds = dobj.getBounds();
    //     g.drawShape(bounds);

    //     //Quick and dirty - let the selection know the obj
    //     //replace by local map??
    //     (<any>g).original = dobj;

    //     this.addChild(g);
    // }

    // private eraseSelected(dobj: DisplayObject) {
    //    //Quick and dirty - let the object carry the selection knowledge
    //    for (let i=0; i<this.children.length;i++) {
    //        let child:any = this.children[i];
    //        if (child.original && child.original === dobj) {
    //              this.removeChild(child);
    //        }
    //    }
    // }
}

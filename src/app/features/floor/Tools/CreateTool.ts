import { Row } from '../DisplayObjects/Row';
import { GPixi } from '../Helpers/GPixi';
import { IDisplayFactory } from '../Interfaces';

const CREATION_THRESHOLD = 500;

export class CreateTool extends PIXI.Container {

    private target: PIXI.Container;

    // ==================================
    // EVENT HANDLING
    // ==================================
    private dragging = false;
    private data = null;
    private start;
    private newObj;
    constructor(private factory: IDisplayFactory) {
        super();
    }

    //
    // The whole clear/apply should probably be revisited at some
    // point and perhaps put in a common parent class.
    //

    public clear() {
        for (let item of this.children) {
            this.removeChild(item);
            item.destroy();
            item = null;
        }
        this.target = null;
        this.visible = false;
    }

    public apply(target: PIXI.Container) {
        this.clear();
        this.target = target;
        GPixi.moveToTop(this);

        const ghostLayer = new PIXI.Graphics();

        // if debug --->              ghostLayer.beginFill(0xFFFF00, 0.2);
        ghostLayer.beginFill(0xFFFF00, 0.0);

        const root = GPixi.getRootContainer(this);
        const bounds = root.getLocalBounds();
        ghostLayer.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);

        this.addChild(ghostLayer);
        ghostLayer.interactive = true;
        ghostLayer.buttonMode = true;
        ghostLayer.cursor = 'crosshair';

        this.addEventHandlers(ghostLayer);

        this.visible = true;
    }

    private addEventHandlers(layer) {
        layer.on('pointerdown', (e) => this.onMouseDown(e))
             .on('pointerup', (e) => this.onDragEnd(e))
             .on('pointerupoutside', (e) => this.onDragEnd(e))
             .on('pointermove', (e) => this.onDragMove(e));
    }

    private onMouseDown(event) {
        event.stopPropagation();
        this.start = event.data.getLocalPosition(this.target.parent);

        this.data = event.data;
        this.dragging = true;
    }
    private onDragEnd(event) {
        this.dragging = false;
        this.data = null;
        this.newObj = null;
    }

    private onDragMove(event) {
        if (this.dragging) {
            const latest = this.data.getLocalPosition(this.target.parent);
            const r = new PIXI.Rectangle(this.start.x, this.start.y, latest.x - this.start.x, latest.y - this.start.y);

            if (r.width > CREATION_THRESHOLD && this.newObj == null) {
                this.newObj = this.factory.createItem({ physicalProperties: {width: r.width, depth: r.height }});
                this.newObj.x = r.x;
                this.newObj.y = r.y;
                this.target.addChild(this.newObj);
            }

            if (this.newObj) {
                this.newObj.updateModel({physicalProperties: { width: r.width, depth: r.height }});
            }
        }
    }
}

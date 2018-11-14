import { GPixi } from '../Helpers/GPixi';

export class PanTool extends PIXI.Container {

    private target: PIXI.Container;
    private offsetX: number;
    private offsetY: number;
    private data: any;
    private dragging: boolean;

    constructor() {
        super();
        this.target = null;
        this.visible = false;
    }

    public apply(target: PIXI.Container) {
        this.clear();
        this.target = target;
        GPixi.moveToTop(this);

        const ghostLayer = new PIXI.Graphics();

        // if debug ---> ghostLayer.beginFill(0xFFFF00, 0.2);
        ghostLayer.beginFill(0xFFFF00, 0.0);

        const root = GPixi.getRootContainer(this);
        const bounds = root.getLocalBounds();
        ghostLayer.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);

        this.addChild(ghostLayer);
        ghostLayer.interactive = true;
        ghostLayer.buttonMode = true;
        ghostLayer.cursor = 'move'; // later use the hand image like below
        this.addEventHandlers(ghostLayer);
        this.visible = true;
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

    // ==================================
    // EVENT HANDLING
    // ==================================
    private addEventHandlers(layer) {
        layer.on('pointerdown', (e) => this.onDragStart(e))
            .on('pointerup', (e) => this.onDragEnd(e))
            .on('pointerupoutside', (e) => this.onDragEnd(e))
            .on('pointermove', (e) => this.onDragMove(e));
    }
    private onDragStart(event) {
        event.stopPropagation();
        const neues = event.data.getLocalPosition(this.target.parent);
        this.offsetX = neues.x - this.target.x;
        this.offsetY = neues.y - this.target.y;
        this.data = event.data;
        this.dragging = true;
    }
    private onDragEnd(event) {
        this.dragging = false;
        this.data = null;
    }

    private onDragMove(event) {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.target.parent);
            this.target.x = newPosition.x - this.offsetX;
            this.target.y = newPosition.y - this.offsetY;
        }
    }
}

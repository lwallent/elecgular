import * as _ from 'lodash';
import { GraphicsModel, IDisplayFactory, IGraphicsModelOptions, ModelDisplayObject } from '../Interfaces';
import { GAPP } from '../pixi.component';
import { ObjectType } from './ObjectType';

//
// If options are not specified use these defaults
//
const CLEARANCE_MODEL_DEFAULTS = {
    label: 'Clearance',
    physicalProperties: {
        width: 1000,
        height: 0,
        depth: 1000,
        weight: 0,
    },
};

export class ClearanceFactory implements IDisplayFactory {
    public createItem(modelOptions: IGraphicsModelOptions): ModelDisplayObject {
        const model = _.defaults({}, modelOptions, CLEARANCE_MODEL_DEFAULTS);
        return new Clearance(model);
    }
}

export class Clearance extends ModelDisplayObject {

     public type = ObjectType.CLEARANCE;

     private background: PIXI.Sprite;

     private texture;

    constructor(model: GraphicsModel) {
        super(model);
        this.texture = this.createClearanceTexture();
        this.drawGraphics();
    }

    public updateModel(change: IGraphicsModelOptions) {
        _.assign(this.model, change);
        this.drawGraphics();
    }

    private drawGraphics() {
        if (this.background) {
            this.removeChild(this.background);
        }
        this.background = new PIXI.TilingSprite(this.texture, this.model.physicalProperties.width, this.model.physicalProperties.depth); // ARGHHH Hardcoded values
        this.addChild(this.background);
    }

    private createClearanceTexture() {
        const g = new PIXI.Graphics();
        g.beginFill(0x000000);

        g.drawRect(0, 0, 4 * 256, 4 * 256);
        g.lineStyle(91, 0xFFFF00, 1);

        g.moveTo(0, 2 * 256 - 1);
        g.lineTo(2 * 255 - 1, 0);

        g.moveTo(0, 3 * 256 - 1);
        g.lineTo(3 * 256 - 1, 0);

        g.moveTo(0, 4 * 256 - 1);
        g.lineTo(4 * 256 - 1, 0);

        const texture: any = GAPP.renderer.generateTexture(g, PIXI.SCALE_MODES.LINEAR);
        const cropped = new PIXI.Texture(texture, new PIXI.Rectangle(255, 255, 256, 256));

        return cropped;
    }
}

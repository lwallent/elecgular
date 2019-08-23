import * as _ from 'lodash';
import {  GraphicsModel, ModelDisplayObject, IGraphicsModelOptions } from '../Interfaces';
import { ObjectType } from './ObjectType';

export class FloorAsset extends ModelDisplayObject {

    public type = ObjectType.FLOOR_ASSET;

    private graphics: PIXI.Graphics;
    private lblText: PIXI.Text;

    constructor(model: GraphicsModel /*IAsset*/) {
        super(model);

        this.createGraphics();
        this.drawGraphics();
    }

   public updateModel(change: IGraphicsModelOptions) {
        _.assign(this.model, change);

        this.drawGraphics();
    }

    // ==================================
    // GRAPHICS HANDLING
    // ==================================

    private drawGraphics() {

        this.graphics.clear();

        this.graphics.beginFill(0xffffff); // later change the fill

        // draw a rectangle
        const wOuter = 10;
        this.graphics.lineStyle(wOuter, 0x000000, 1);
        this.graphics.drawRect(wOuter / 2, wOuter / 2, this.model.physicalProperties.width - wOuter, this.model.physicalProperties.depth - wOuter);

        // CHOOSE COLOR BY TYPE
        const wInner = 60;
        this.graphics.lineStyle(wInner, 0xC0C0C0, 1);
        this.graphics.drawRect(wOuter + wInner / 2, wOuter + wInner / 2, this.model.physicalProperties.width - (wInner + 2 * wOuter), this.model.physicalProperties.depth - (wInner + 2 * wOuter));

        const barWidth = 50;
        this.graphics.lineStyle(barWidth, 0x606060, 1);
        this.graphics.moveTo(wOuter + wInner, wOuter + wInner + barWidth / 2);
        this.graphics.lineTo(this.model.physicalProperties.width - (wInner + wOuter), wOuter + wInner + barWidth / 2);

       // tslint:disable-next-line:no-commented-code
       // let lblText = new PIXI.Text(this.model.label, {fontSize:50});

        // TYPE BASED LETTER
        if (this.lblText == null) {
            this.lblText = new PIXI.Text('R', {fontSize: '160pt'});
            this.addChild(this.lblText);
        }
        this.lblText.x = (this.model.physicalProperties.width - this.lblText.width) / 2;
        this.lblText.y = 110;
    }

    private createGraphics() {
        this.graphics = new PIXI.Graphics();
        this.addChild(this.graphics);
    }
}

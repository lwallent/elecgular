import * as _ from 'lodash';
// import * as PIXI from 'pixi.js';
import { DisplayObject } from 'pixi.js';
import { GraphicsModel, IDisplayFactory, IGraphicsModelOptions, ModelDisplayObject } from '../Interfaces';
import { ObjectType } from './ObjectType';

//
// If options are not specified use these defaults
//
const ROW_MODEL_DEFAULTS = {
    label: 'Row',
    physicalProperties: {
        width: 10000,
        height: 0,
        depth: 600,
        weight: 0,
    },
};

export interface IRow {
    getRowContainer(): PIXI.Container;
}

export class RowFactory implements IDisplayFactory {
    public createItem(modelOptions: IGraphicsModelOptions): ModelDisplayObject {
        const model = _.defaults({}, modelOptions, ROW_MODEL_DEFAULTS);
        return new Row(model);
    }
}

export class Row extends ModelDisplayObject implements IRow {

    public static isRow(obj: ModelDisplayObject): obj is Row {
        return obj.type === ObjectType.ROW;
    }

    public type = ObjectType.ROW;

    private graphics: PIXI.Graphics;

    private rowContainer: PIXI.Container;

    constructor(model: GraphicsModel) {
        super(model);
        this.createGraphics();
        this.drawGraphics();
    }

    public updateModel(change: IGraphicsModelOptions) {
        _.assign(this.model, change);
        this.drawGraphics();
        this.updatePosition();
    }

    public addChild<T extends DisplayObject>(child: T, ...additionalChildren: DisplayObject[]): T {
       // public addChild(child: DisplayObject) {
        return this.rowContainer.addChild(child);
    }

    public getRowContainer() {
        return this.rowContainer;
    }

    // ==================================
    // GRAPHICS HANDLING
    // ==================================
    private updatePosition() {
        if (this.model.position) {
            this.x = this.model.position.x;
            this.y = this.model.position.y;
        }
    }
    private drawGraphics() {
        if (this.graphics) {
            this.graphics.clear();

            let lbl = this.graphics.getChildByName('lbl') as PIXI.Text;

            if (lbl === null) {
              lbl = new PIXI.Text(this.model.label, {fontSize: '160pt'});
              lbl.name = 'lbl';
              lbl.x = 0;
              lbl.y = 0;
              this.graphics.addChild(lbl);
            } else {
                lbl.text = this.model.label;
            }
            const yOffset = lbl.y + lbl.height;
            this.rowContainer.y = yOffset;
            this.rowContainer.x = 0;

            // set a fill and line style
            this.graphics.beginFill(0xE0E0D7, 0.4); // later change the fill

            // draw a rectangle
            const wOuter = 10;
            this.graphics.lineStyle(wOuter, 0x000000, 1);
            this.graphics.drawRect(wOuter / 2, yOffset + wOuter / 2, this.model.physicalProperties.width - wOuter, this.model.physicalProperties.depth - wOuter);

            const barWidth = 10;
            this.graphics.lineStyle(barWidth, 0x000000, 1);
            const yVal = yOffset + wOuter + 6 * barWidth / 2;
            this.graphics.moveTo(wOuter, yVal);
            this.graphics.lineTo(this.model.physicalProperties.width - (wOuter), yVal);
        }
    }

    private createGraphics() {
        this.graphics = new PIXI.Graphics();
        super.addChild(this.graphics);
        this.rowContainer = new PIXI.Container();
        super.addChild(this.rowContainer);
    }
}

import { DisplayObject } from 'pixi.js';
import { ObjectType } from './DisplayObjects/ObjectType';

export interface IPhysicalProperties {
    width: number;
    height: number;
    depth: number;
    weight: number;
}

export interface  ICoords {
    x: number;
    y: number;
    z: number;
}

// Just like the model - but all optional ...!?
export interface IGraphicsModelOptions {
    physicalProperties: {
         width?: number;
         height?: number;
         depth?: number;
         weight?: number;
    };
    label?: string;

}

//
// Later the Row Model needs to be stored on the server in a drawing/graphics section
//

export class GraphicsModel {

    // Just use physical properties ??
    public physicalProperties?: IPhysicalProperties;
    public position?: ICoords;

    public label: string;
}

export abstract class ModelDisplayObject extends PIXI.Container {

    public abstract type: ObjectType;

    constructor(protected model: GraphicsModel) {
        super();
        this.interactive = true;
        this.buttonMode = true;
    }
    public abstract updateModel(change: IGraphicsModelOptions);

    public getModel() { return this.model; }
}

export interface IDisplayFactory {
    createItem(modelOptions: IGraphicsModelOptions): ModelDisplayObject;
}

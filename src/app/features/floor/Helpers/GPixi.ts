import { DisplayObject } from 'pixi.js';
import { ObjectType } from '../DisplayObjects/ObjectType';
import { ModelDisplayObject } from '../Interfaces';

// methods ported from https://github.com/mrgoonie/pixi-transform-tool/blob/master/js/plugins/gpixi.js

const zIndexSorter = (a, b) => {
    a.zIndex = a.zIndex || 0;
    b.zIndex = b.zIndex || 0;
    return a.zIndex - b.zIndex;
};

export class GPixi {
    public static moveToTop(item: any) {
        const parent = item.parent;
        const topZIndex = parent.children.length - 1;
        for (let i = 0; i < parent.children.length; i++) {
            const child = parent.children[i];
            child.zIndex = i; // re-assign zIndex to children

            if (child.zIndex > item.zIndex) {
                child.zIndex = parseInt(child.zIndex, 10) - 1;
            }
        }

        // swap zIndex of the top item
        // parent.children[topZIndex].zIndex = item.zIndex;
        item.zIndex = topZIndex;
        // sort children..
        parent.children.sort(zIndexSorter);
    }

    public static moveToBottom(item: any) {
        // console.log("moveToTop")
        const parent = item.parent;
        const bottomZIndex = 0;
        for (let i = 0; i < parent.children.length; i++) {
            parent.children[i].zIndex = i + 1; // re-assign zIndex to children
        }
        // swap zIndex of the top item
        // parent.children[bottomZIndex].zIndex = item.zIndex;
        item.zIndex = bottomZIndex;
        // sort children..
        parent.children.sort(zIndexSorter);
    }

    public static moveAboveItem(target, item) {
        const parent = item.parent;
        for (let i = 0; i < parent.children.length; i++) {
            parent.children[i].zIndex = i; // re-assign zIndex to children
        }
        for (let i = 0; i < parent.children.length; i++) {
            if (i > item.zIndex) {
                parent.children[i].zIndex += 1;
            }
        }
        target.zIndex = item.zIndex + 1;
        // sort children..
        parent.children.sort(zIndexSorter);
    }

    public static moveBelowItem(target, item) {
        const parent = item.parent;
        for (let i = 0; i < parent.children.length; i++) {
            parent.children[i].zIndex = i; // re-assign zIndex to children
        }
        for (let i = 0; i < parent.children.length; i++) {
            if (i >= item.zIndex) {
                parent.children[i].zIndex += 1;
            }
        }
        target.zIndex = item.zIndex - 1;
        // sort children..
        parent.children.sort(zIndexSorter);
    }

    public static swapIndex(item1, item2) {
        if (item1.parent !== item2.parent) {
            // tslint:disable-next-line:no-console
            console.log('[GPixi Error] Children are not in the same parent.');
            return;
        }
        const parent = item1.parent;
        for (let i = 0; i < parent.children.length; i++) {
            parent.children[i].zIndex = i; // re-assign zIndex to children
        }
        // swap zIndex
        const tmpZindex = item2.zIndex;
        item2.zIndex = item1.zIndex;
        item1.zIndex = tmpZindex;
        // sort children..
        parent.children.sort(zIndexSorter);
    }

    public static getRootContainer(item: DisplayObject): DisplayObject {
        if (item.parent) {
            return GPixi.getRootContainer(item.parent);
        }
        return item;
    }

    public static isContainer(obj: PIXI.DisplayObject | PIXI.Container): obj is PIXI.Container {
        return (obj as PIXI.Container).children !== undefined;
    }

    public static allOfType(container: PIXI.Container, type: ObjectType, result?: ModelDisplayObject[]): ModelDisplayObject[] {

        result = (result) ? result : [];

        for (const child of container.children as any) {
            if (child.type && child.type === type) {
                result.push(child);
            }
            if (GPixi.isContainer(child)) {
                GPixi.allOfType(child, type, result);
            }
        }

        return result;
    }

    public static getCollidingChildren(rectangle: PIXI.DisplayObject, container: PIXI.Container): DisplayObject[] {
        const result: DisplayObject[] = [];

        // NON RECURSIVE FOR NOW !?
        const rectangleCollision = (r, children) => {

            for (const child of children) 	{
                const rc = child.getBounds(); // WE USE GLOBAL SHARED COORDINATE SPACE

                if (GPixi.isBoundingBoxCollision(rc, r)) { // DOES NOT TAKE ROTATION INTO CONSIDERATION
                    result.push(child);
                }
            }
        };

        // traverse children
        rectangleCollision(rectangle, container.children);

        return result;
    }

    public static isBoundingBoxCollision(r1: PIXI.Rectangle, r2: PIXI.Rectangle) {
             return !((r1.y + r1.height < r2.y) ||            //  (r.Bottom < rc.Top)
                      (r1.y > r2.y + r2.height) ||            //  (r.Top >    rc.Bottom)
                      (r1.x > r2.x + r2.width) ||             //  (r.Left > rc.Right)
                      (r1.x + r1.width < r2.x) );             //  (r.Right < rc.Left) )
    }
}

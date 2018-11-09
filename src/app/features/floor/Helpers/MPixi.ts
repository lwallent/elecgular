import { DisplayObject } from 'pixi.js';

export class MPixi {

    // public static hasModel(dobj: DisplayObject) : boolean {
    //     let temp:any = dobj;
    // }

   public static angleRadBetweenLineAndXaxis(p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x);
   }

  public static degToRad(deg) {
    return deg * Math.PI / 180;
  }

  public static radToDeg(rad) {
    return rad * 180 / Math.PI;
  }
}

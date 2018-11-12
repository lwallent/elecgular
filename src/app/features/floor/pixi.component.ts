import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Application } from 'pixi.js';
import { FloorPlan } from './DisplayObjects/FloorPlan';
import { Row, RowFactory } from './DisplayObjects/Row';
import { ClearanceFactory } from './DisplayObjects/Clearance';
import { TransformTool } from './Tools/TransformTool';
import { CreateTool } from './Tools/CreateTool';
import { SelectTool } from './Tools/SelectTool';
import { PanTool } from './Tools/PanTool';

// tslint:disable:member-ordering

// IN PIXELS
const PIXI_WIDTH = 800;
const PIXI_HEIGHT = 600;

// IN MM
const FLOOR_WIDTH = 20000;
const FLOOR_HEIGHT = 20000;

// TODO: The app instance or renderer should be shared in a different way
export let GAPP: PIXI.Application;

@Component({
    selector: 'pixi',
    template: '<div #pixiContainer></div>',
})
export class PixiComponent implements OnInit {
    @ViewChild('pixiContainer') private pixiContainer; // this allows us to reference and load stuff into the div container

    private app: Application;
    private floorplan: PIXI.Container;
    private mmLand: PIXI.Container;
    private tool;

    private transformTool;

    public ngOnInit(): void {

        this.app = new Application(PIXI_WIDTH, PIXI_HEIGHT, {backgroundColor : 0xffffff});      // this creates our pixi application

        // How should we share the renderer?? QUICK AND DIRTY
        GAPP = this.app;

        this.pixiContainer.nativeElement.appendChild(this.app.view); // this places our pixi application onto the viewable document

        this.app.stage.interactive = true;
        // We choose to not scale the stage it self in order to be able to draw in
        // pixels (without scaling effect) on the stage level and direct childs

        // Instead we create a container for all crazy people who see things
        // in millimeters - meet mmLand. In mmLand everything is automatically
        // scaled before drawing them onto the stage
        this.mmLand = new PIXI.Container();
        this.mmLand.scale.x = this.mmLand.scale.y = .10; // simple starting scale
        this.app.stage.addChild(this.mmLand); //

        // ADD BACKGROUND
        this.addBackgroundGrid(this.mmLand);

        // ADD FLOORPLAN
        this.floorplan = new FloorPlan();
        this.mmLand.addChild(this.floorplan); // The floorplan is a direct child of the stage

        // ADD TRANSFORM TOOL
      //  const placementLocator = new PlacementLocator();
        this.transformTool = new TransformTool();
        this.app.stage.addChild(this.transformTool);

        // ADD SOME TEMP ROWS
        //   this.addSomeRows(this.floorplan, 3);

        //  let tileGraphics = createFloorTiles();
        //  this.floorplan.addChild(tileGraphics);

        //      this.addFloorAssets(design, this.floorplan);

        // TEMP TRANSFORM TESTING ...
        const row = new Row({physicalProperties: { width: 10000, depth: 1070, height: 0, weight: 0}, label: 'Row A'});
        row.y = 1500;
        row.x = 50;

        this.floorplan.addChild(row);
        // TRANSFORM TEST END <<<<<<<<

        // this.addFloorAssets(design, row);

        //MAX OUT TESTING ....
        // let rack = _.find(design.assets, (a)=> Asset.isRack(a));

        //  //Max testing
        //  let posX = 0;
        //  let posY = 0;
        //  let graphicAsset;
        //  for (var i=0; i < 100; i++) {
        //      for (var j=0; j < 100; j++) {
        //          graphicAsset = new FloorAsset(rack);
        //          this.floorplan.addChild(graphicAsset);
        //          graphicAsset.x = posX;
        //          graphicAsset.y = posY;
        //          posX += graphicAsset.width;
        //      }

        //      posY += graphicAsset.height*2
        //      posX = 0;
        //  }

        this.usePointerTool();
    }

    // private addFloorAssets(design, parent) {

    //     //for now just lay them out horizontally ...

    //     let posX = 0;
    //     _.forEach(design.assets, (asset) => {
    //         if (Asset.isRack(asset)) {
    //             let graphicAsset = new FloorAsset(asset);
    //             parent.addChild(graphicAsset);
    //             graphicAsset.x = posX;

    //             posX += graphicAsset.width;
    //         }
    //     });
    // }

    private addSomeRows(floorplan, numRows) {
         for (let i = 0; i < numRows; i++) {
               const r1 = new Row({physicalProperties: {width: 10000, depth: 1070, height: 0, weight: 0}, label: 'Row ' + i});
               r1.y = 1500 + i * (1070 + 1000);
               r1.x = 0;

               floorplan.addChild(r1);
         }
    }

    private addBackgroundGrid(mmLand) {
         const texture = this.createBackgroundTexture();
         const bg = new PIXI.TilingSprite(texture, 20000, 20000); // ARGHHH Hardcoded values
         mmLand.addChild(bg);
    }

    private createBackgroundTexture() {
        const g = new PIXI.Graphics();
        g.lineStyle(10, 0xEBEBEB, 1);
        for (let i = 0; i < 600; i = i + 150) {
            // horizontals
            g.moveTo(i, 0);
            g.lineTo(i, 599);
            // verticals
            g.moveTo(0, i);
            g.lineTo(599, i);
        }
        const texture = this.app.renderer.generateTexture(g, PIXI.SCALE_MODES.NEAREST);
        return texture;
    }

    public setViewSize(w, h) {
        if (this.app) {
           this.app.renderer.resize(w, h);
        }
    }

    // ==================================
    // ZOOM SECTION
    // ==================================
    private resetTools() {
        if (this.transformTool) {
            this.transformTool.reset();
        }
    }

    public zoomIn() {
        let scale = this.mmLand.scale.x;
        scale *= (1 + 0.1);
        this.mmLand.scale.x = this.mmLand.scale.y = scale;

        this.mmLand.updateTransform();

        this.resetTools();
    }

    public zoomOut() {
        let scale = this.mmLand.scale.x;
        scale *= (1 - 0.1);
        this.mmLand.scale.x = this.mmLand.scale.y = scale;

        this.mmLand.updateTransform();

        this.resetTools();
    }

    public zoomFit() { // FIT THE FLOORPLAN THIS MEANS
        this.floorplan.calculateBounds();

        const local =  this.floorplan.getLocalBounds();
        const scaleX = this.app.renderer.width / local.width;
        const scaleY = this.app.renderer.height / local.height;
        const scaleMin = Math.min(scaleX, scaleY);
        this.mmLand.scale.x = this.mmLand.scale.y = scaleMin;

        // Move the floorplan into view
        this.floorplan.x = 0;
        this.floorplan.y = 0;

        this.mmLand.updateTransform();

        this.resetTools();
    }

    // ==================================
    // TOOL SECTION
    // ==================================
    private deactivateTool() {
        if (this.tool) {
            this.app.stage.removeChild(this.tool);
            this.tool.clear();
        }
    }

    private activateTool(tool) {
        this.deactivateTool();
        this.tool = tool;
        this.app.stage.addChild(this.tool);
        this.tool.apply(this.floorplan);
    }

    public usePanTool() {
        this.activateTool(new PanTool());
    }

    public usePointerTool() {
        const selectionManager = {
            onClear: () => {
                this.transformTool.clear();

            },
            onSelection: (selected) => {
                this.transformTool.apply(selected);
            },
        };
        this.activateTool(new SelectTool(selectionManager));
    }

    public rowTool() {
        this.activateTool(new CreateTool( new RowFactory()));
    }

    public clearanceTool() {
       this.activateTool(new CreateTool( new ClearanceFactory()));
    }
}

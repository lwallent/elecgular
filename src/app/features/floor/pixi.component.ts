import { Component, OnInit, ViewChild } from '@angular/core';
import { Application } from 'pixi.js';
import { FloorPlan } from './DisplayObjects/FloorPlan';
import { Row } from './DisplayObjects/Row';
import { TransformTool } from './Tools/TransformTool';
import { SelectTool } from './Tools/SelectTool';

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

        //  let tileGraphics = createFloorTiles();
        //  this.floorplan.addChild(tileGraphics);

        // this.addFloorAssets(design, this.floorplan);

        // this.addFloorAssets(design, row);

        this.usePointerTool();
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

    public getFloorPlan() {
        return this.floorplan;
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

    public activateTool(tool) {
        this.deactivateTool();
        this.tool = tool;
        this.app.stage.addChild(this.tool);
        this.tool.apply(this.floorplan);
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
}

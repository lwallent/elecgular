import { Component, OnDestroy, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { ToolbarContributionService } from '../../components/toolbar/toolbar.service';
import { PixiComponent } from './pixi.component';
import { RowFactory, Row } from './DisplayObjects/Row';
import { CreateTool } from './Tools/CreateTool';
import { ClearanceFactory } from './DisplayObjects/Clearance';
import { PanTool } from './Tools/PanTool';
import { GraphicsModel } from './Interfaces';
import * as _ from 'lodash';
import { FloorAsset } from './DisplayObjects/FloorAsset';

const CONTRIBUTION_ID = 'FLOOR_VIEW';
 // tslint:disable:member-ordering

@Component({
    template: `<div #viewport style="width:100%;height:100%">
                <pixi #child ></pixi>
               </div>`,
})
export class FloorComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('child') private pixi: PixiComponent;

    @ViewChild('viewport') private viewport: ElementRef;

    @HostListener('window:resize') private onResize() {
        if (this.viewport) {
          this.adjustSize();
        }
    }

    constructor(private toolbarContribution: ToolbarContributionService) {

    }

    public ngAfterViewInit(): void {
        this.adjustSize();
        this.loadContent();
    }

    public ngOnDestroy(): void {
        this.toolbarContribution.remove(CONTRIBUTION_ID);
    }

    public ngOnInit(): void {

        const actions = [
            {
                iconName: 'zoom_in',
                action: () => {
                    this.pixi.zoomIn();
                },
            },
            {
                iconName: 'zoom_out',
                action: () => {
                    this.pixi.zoomOut();
                },
            },
            {
                iconName: 'zoom_out_map',
                action: () => {
                    this.pixi.zoomFit();
                },
            },
            {
                iconName: 'navigation',
                action: () => {
                    this.pixi.usePointerTool();
                },
                shortcut: 'space',
                displayKey: 'floor.action.POINTER',
            },
            {
                iconName: 'pan_tool',
                action: () => {
                    this.pixi.activateTool(new PanTool());
                },
                shortcut: 'h',
                displayKey: 'floor.action.PAN',
            },
            {
                iconName: 'drag_handle',
                action: () => {
                    this.pixi.activateTool(new CreateTool( new RowFactory()));
                },
                shortcut: 'r',
                displayKey: 'floor.action.ROW',
            },
            {
                iconName: 'movie',
                action: () => {
                    this.pixi.activateTool(new CreateTool( new ClearanceFactory()));
                },
                shortcut: 'c',
                displayKey: 'floor.action.CLEARANCE',
            },
        ];

        this.toolbarContribution.add({
            providerId: CONTRIBUTION_ID,
            actions,
        });

    }

    private adjustSize() {
        this.pixi.setViewSize(this.viewport.nativeElement.clientWidth, this.viewport.nativeElement.clientHeight);
    }

    private loadContent() {

        // ADD SOME TEMP ROWS
        this.addSomeRows(this.pixi.getFloorPlan(), 2);

        this.addFloorTiles(this.pixi.getFloorPlan());

        // Floor Assets can be added to both the floor but also to the row

        // this.addFloorAssets(design, this.floorplan);

        // this.addFloorAssets(design, row);
    }

    private maxoutTesting() {
        //MAX OUT TESTING ....
        // let rack = _.find(design.assets, (a)=> Asset.isRack(a));

        //  //Max testing
        //  let posX = 0;
        //  let posY = 0;
        //  let graphicAsset;
        //  for (var i=0; i < 100; i++) {
        //      for (var j=0; j < 100; j++) {
        //          graphicAsset = new FloorAsset(rack);
        //          this.pixi.getFloorPlan().addChild(graphicAsset);
        //          graphicAsset.x = posX;
        //          graphicAsset.y = posY;
        //          posX += graphicAsset.width;
        //      }

        //      posY += graphicAsset.height*2
        //      posX = 0;
        //  }
    }

    private addFloorTiles(floorplan) {
        //  let tileGraphics = createFloorTiles();
        //  floorplan.addChild(tileGraphics);
    }

    private addFloorAssets(parent) {

        const floorAssets: GraphicsModel[] = [
            {
                label: 'R1.1',
                physicalProperties: {
                    width: 600,
                    height: 2100,
                    depth: 1070,
                    weight: 3000,
                },
            },
        ];

        // for now just lay them out horizontally ...
        let posX = 0;
        _.forEach(floorAssets, (asset) => {

            const graphicAsset = new FloorAsset(asset);
            parent.addChild(graphicAsset);
            graphicAsset.x = posX;

            posX += graphicAsset.width;
        });
    }


    private addSomeRows(floorplan, numRows) {
        for (let i = 0; i < numRows; i++) {
            const r1 = new Row({physicalProperties: {width: 10000, depth: 1070, height: 0, weight: 0}, label: 'Row ' + i});
            r1.y = 1500 + i * (1070 + 1000);
            r1.x = 0;

            this.addFloorAssets(r1);

            floorplan.addChild(r1);
        }
   }
}

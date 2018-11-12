import { Component, OnDestroy, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { ToolbarContributionService } from '../../components/toolbar/toolbar.service';
import { PixiComponent } from './pixi.component';

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
            },
            {
                iconName: 'pan_tool',
                action: () => {
                    this.pixi.usePanTool();
                },
            },
            {
                iconName: 'drag_handle',
                action: () => {
                    this.pixi.rowTool();
                },
            },
            {
                iconName: 'movie',
                action: () => {
                    this.pixi.clearanceTool();
                },
            }
        ];

        this.toolbarContribution.add({
            providerId: CONTRIBUTION_ID,
            actions,
        });
    }

    private adjustSize() {
        this.pixi.setViewSize(this.viewport.nativeElement.clientWidth, this.viewport.nativeElement.clientHeight);
    }
}

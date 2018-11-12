import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToolbarContributionService } from '../../components/toolbar/toolbar.service';
import { PixiComponent } from './pixi.component';

const CONTRIBUTION_ID = 'FLOOR_VIEW';

@Component({
    template: '<pixi #child ></pixi>',
})
export class FloorComponent implements OnInit, OnDestroy {

    @ViewChild('child') private pixi: PixiComponent;

    constructor(private toolbarContribution: ToolbarContributionService) {

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
}

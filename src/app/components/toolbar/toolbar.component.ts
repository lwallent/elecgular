import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {DialogService} from '../../services/dialog.service';
import {UtilsService} from '../../services/utils.service';
import { IAction, ToolbarContributionService } from './toolbar.service';

@Component({
    selector: 'app-toolbar',
    template: `<div class="toolbar">
                    <mat-toolbar fxLayout="row" fxLayoutAlign="begin center" >

                        <button *ngFor="let item of contributed" color="primary" (click)="onItemSelected(item)" mat-icon-button>
                            <mat-icon>{{item.iconName}}</mat-icon>
                        </button>

                        <div fxFlex></div>

                        <button (click)="utilsService.toggleFullScreen()" class="fullscreen"
                                color="primary" [title]="'TOOLTIPS.FULLSCREEN' | translate"
                                mat-icon-button>
                            <mat-icon>fullscreen</mat-icon>
                        </button>

                    </mat-toolbar>
                </div>`,
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

    @Input() public sidenav: MatSidenav;

    public savingStatus: any;

    private contributed: IAction[];

    constructor(public utilsService: UtilsService,
                public dialogService: DialogService,
                private toolbarContributions: ToolbarContributionService) {
    }

    public ngOnInit() {
        this.toolbarContributions.contributions.subscribe((res) => {
            this.contributed = res.reduce<IAction[]>((reduction, contr) => {
                return reduction.concat(contr.actions);
            }, []);
        });
    }

    public onItemSelected(item: IAction) {
        if (item.route) {
            // tslint:disable-next-line:no-commented-code
            // this.router.navigate([item.route]);
        } else if (item.action) {
            item.action();
        }
    }
}

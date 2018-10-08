import {Component, Input, OnInit} from "@angular/core";
import {UtilsService} from "../../services/utils.service";
import {MatSidenav} from "@angular/material";
import {DialogService} from "../../services/dialog.service";

@Component({
    selector: "app-toolbar",
    template: `<div class="toolbar">
                    <mat-toolbar fxLayout="row" fxLayoutAlign="end center" >
                   
                        <button (click)="utilsService.toggleFullScreen()" class="fullscreen"
                                color="primary" [title]="'TOOLTIPS.FULLSCREEN' | translate"
                                mat-icon-button>
                            <mat-icon>fullscreen</mat-icon>
                        </button>

                    </mat-toolbar>
                </div>`,
    styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {

    @Input() public sidenav: MatSidenav;

    public savingStatus: any;

    constructor(public utilsService: UtilsService,
                public dialogService: DialogService) {
    }

    ngOnInit() {
       
    }
}

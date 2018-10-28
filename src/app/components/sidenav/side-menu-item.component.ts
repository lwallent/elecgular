import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { IMenuContribution } from './menu-contribution';
import { SideNavService } from './sidenav.service';

@Component({
    selector: 'side-menu-item',
    template: `<mat-list-item [ngStyle]="{'padding-left': (+wide*depth * 12) + 'px'}" (click)="onItemSelected(item)"
                    [ngClass]="{'active': item.route ? router.isActive(item.route, true): false, 'expanded': expanded}">

                    <button color="primary" mat-icon-button>
                        <mat-icon>{{item.iconName}}</mat-icon>
                    </button>
                    <div fxFlex fxLayout="row" fxLayoutAlign="end end" *ngIf="wide">
                        <span *ngIf="item.displayName">{{item.displayName}}</span>
                        <span *ngIf="item.displayKey">{{item.displayKey | translate}}</span>
                        <div fxFlex></div>
                        <mat-icon style="margin-right:10px" fxFlex="20px" *ngIf="item.children && item.children.length" [@indicatorRotate]="expanded ? 'expanded': 'collapsed'">
                            expand_more
                        </mat-icon>
                    </div>
                </mat-list-item>
                <div *ngIf="expanded && wide">
                    <side-menu-item *ngFor="let child of item.children" [item]="child" [depth]="depth+1" [wide]="wide">
                    </side-menu-item>
                </div>`,
    styleUrls: ['./side-menu-item.component.scss'],
    animations: [
        trigger('indicatorRotate', [
            state('collapsed', style({transform: 'rotate(0deg)'})),
            state('expanded', style({transform: 'rotate(180deg)'})),
            transition('expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4,0.0,0.2,1)'),
            ),
        ]),
    ],

})
export class SideMenuItemComponent {
    public expanded: boolean;
    @Input() public item: IMenuContribution;
    @Input() public depth: number;
    @Input() public wide: boolean;
    @HostBinding('attr.aria-expanded') private ariaExpanded = this.expanded;

    constructor(public navService: SideNavService,
                public router: Router) {
      if (this.depth === undefined) {
        this.depth = 0;
      }
    }

    public onItemSelected(item: IMenuContribution) {
      if (!item.children || !item.children.length) {
        if (item.route) {
            this.router.navigate([item.route]);
        } else if (item.action) {
            item.action();
        }
      }
      if (item.children && item.children.length) {
        this.expanded = !this.expanded;
      }
    }
}

import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { IconGridTemplateDirective } from './icon-grid-template.directive';

@Component({
    selector: 'icon-grid',
    template: `<mat-grid-list cols="8" rowHeight="2:1" style="padding:0 20px;">
                    <mat-grid-tile *ngFor="let key of iconKeys" class="icon-tile" [routerLink]="['details', key]">
                        <div fxLayout="column" fxLayoutAlign="center center" >
                            <ng-container *ngTemplateOutlet="iconTemplate; context: {$implicit: key}"></ng-container>
                            <div class="icon-name">{{key}}</div>
                        </div>
                    </mat-grid-tile>
                </mat-grid-list>`,
    styleUrls: ['./icon-grid.component.scss'],
})
export class IconGridComponent {
    @Input() private iconKeys;
    @ContentChild(IconGridTemplateDirective, { read: TemplateRef }) private iconTemplate: TemplateRef<any>;
}

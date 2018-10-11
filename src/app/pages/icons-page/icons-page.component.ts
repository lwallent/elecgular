import { Component, OnInit } from "@angular/core";
import { far } from '@fortawesome/free-regular-svg-icons';
import * as _ from 'lodash';

/**
 *  Nice, General Headline
 * 
 *  Add search - quick filtering
 *  Solve Scrolling,
 *  More sets (glyphicon, mat-icon?)
 *  Add Icon Details page (sizes, colors, properties, animations, buttons, ...)
 *  
 */

@Component({
    selector: 'icons-page',
    template: `<h1>Icon Overview</h1>
 
    <mat-grid-list cols="8" rowHeight="2:1" style="padding:0 20px">
      <mat-grid-tile *ngFor="let topic of faKeys" style="width:100%" > 
        <div fxLayout="column" fxLayoutAlign="center center" style="width:100%" >
           <fa-icon [icon]="['fas', topic]"></fa-icon>
            <div class="icon-name" > {{topic}}</div>
        </div>
      </mat-grid-tile>
    </mat-grid-list>`,
    styleUrls: ['./icons-page.component.scss'],
})
export class PageIconsComponent implements OnInit {
    faKeys: string[];
    ngOnInit(): void {
        this.faKeys = Object.keys(far).map((name) => _.kebabCase(name.substr(2)) );
        this.faKeys = this.faKeys.filter((key) => key !== 'font-awesome-logo-full')
    }



}
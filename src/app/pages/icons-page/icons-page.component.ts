import { Component, OnInit } from "@angular/core";
import { far } from '@fortawesome/free-regular-svg-icons';
import * as _ from 'lodash';

/**
 *  Nice, General Headline
 * 
 *  More sets (glyphicon, mat-icon?)
 *  Add Icon Details page (sizes, colors, properties, animations, buttons, ...)
 *  
 */

@Component({
    selector: 'icons-page',
    template: `<h1>Icon Overview</h1><hr/>
        
            <form class="search-form">
                <mat-form-field class="search-field">
                <input matInput [ngModel]="searchTerm" placeholder="Search for icons" (ngModelChange)="searchDebounced($event)" name="searchTerm" >
                </mat-form-field>
            </form>

            <mat-grid-list cols="8" rowHeight="2:1" style="padding:0 20px;">
            <mat-grid-tile *ngFor="let topic of faKeysVisible" style="width:100%" > 
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

    faKeysVisible: string[];

    searchTerm: string = "";

    private searchDebounced = _.debounce((x) => this.searchChanged(x), 250, { 'maxWait': 1000 });

    ngOnInit(): void {
        this.faKeys = Object.keys(far).map((name) => _.kebabCase(name.substr(2)) );
        this.faKeys = this.faKeys.filter((key) => key !== 'font-awesome-logo-full');
        this.faKeysVisible = this.faKeys;
    }
    searchChanged(term) {
        this.faKeysVisible = this.faKeys.filter((name) => name.search(term) !== -1);
    }
}
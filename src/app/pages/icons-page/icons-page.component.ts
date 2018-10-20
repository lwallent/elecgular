import { Component, OnInit } from "@angular/core";
import { far } from '@fortawesome/free-regular-svg-icons';
import * as _ from 'lodash';

@Component({
    selector: 'icons-page',
    template: `
            <form class="search-form">
                <mat-form-field class="search-field">
                <input matInput [ngModel]="searchTerm" placeholder="Search for icons" (ngModelChange)="searchDebounced($event)" name="searchTerm" >
                </mat-form-field>
            </form>

            <mat-grid-list cols="8" rowHeight="2:1" style="padding:0 20px;">
                <mat-grid-tile *ngFor="let key of faKeysVisible" class="icon-tile" [routerLink]="['details', key]"> 
                    <div fxLayout="column" fxLayoutAlign="center center" >
                        <fa-icon [icon]="['far', key]"></fa-icon>
                        <div class="icon-name" > {{key}}</div>
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
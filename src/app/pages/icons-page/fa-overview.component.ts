import { Component, OnInit } from '@angular/core';
import { far } from '@fortawesome/free-regular-svg-icons';
import * as _ from 'lodash';

@Component({
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

    styleUrls: ['./fa-overview.component.scss'],
})
export class FaOverviewComponent implements OnInit {
    public faKeys: string[];

    public faKeysVisible: string[];

    public searchTerm: string = '';

    private searchDebounced = _.debounce((x) => this.searchChanged(x), 250, { maxWait: 1000 });

    public ngOnInit(): void {
        this.faKeys = Object.keys(far).map((name) => _.kebabCase(name.substr(2)) );
        this.faKeys = this.faKeys.filter((key) => key !== 'font-awesome-logo-full');
        this.faKeysVisible = this.faKeys;
    }
    public searchChanged(term) {
        this.faKeysVisible = this.faKeys.filter((name) => name.search(term) !== -1);
    }
}

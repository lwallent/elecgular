import { Component, OnInit } from '@angular/core';
import { far } from '@fortawesome/free-regular-svg-icons';
import * as _ from 'lodash';

@Component({
    template: `<key-search-bar [keys]="faKeys" (valueChange)="keysChanged($event)" ></key-search-bar>
                <icon-grid [iconKeys]="faKeysVisible" >
                    <fa-icon *iconGridTemplate="let key" [icon]="['far', key]"></fa-icon>
                </icon-grid>`,
})
export class FaOverviewComponent implements OnInit {
    public faKeys: string[];
    public faKeysVisible: string[];

    public ngOnInit(): void {
        this.faKeys = Object.keys(far).map((name) => _.kebabCase(name.substr(2)) );
        this.faKeys = this.faKeys.filter((key) => key !== 'font-awesome-logo-full');
        this.faKeysVisible = this.faKeys;
    }
    public keysChanged(keys) {
        this.faKeysVisible = keys;
    }
}

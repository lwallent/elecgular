import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

// Ok, this is kind of crazy and I am myself amazed that it worked :-)
// tslint:disable-next-line:no-var-requires
const elems = require('csv-loader!material-design-icons/iconfont/codepoints');

@Component({
    template: `<key-search-bar [keys]="matKeys" (valueChange)="keysChanged($event)" ></key-search-bar>
                <icon-grid [iconKeys]="matKeysVisible">
                    <mat-icon *iconGridTemplate="let key">{{key}}</mat-icon>
                </icon-grid>`,
})
export class MatOverviewComponent implements OnInit {

    public matKeys: string[];
    public matKeysVisible: string[];

    public ngOnInit() {
        // picked up as [ ["3d_rotation e84d"] ...]
        this.matKeys = elems.map((tkns) => tkns[0].split(' ')[0]);
        this.matKeysVisible = this.matKeys;
    }

    public keysChanged(keys) {
        this.matKeysVisible = keys;
    }
}

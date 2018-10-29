import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'key-search-bar',
    template: `<form class="search-form">
                    <mat-form-field class="search-field">
                    <input matInput [ngModel]="searchTerm" placeholder="Search ..." (ngModelChange)="searchDebounced($event)" name="searchTerm" >
                    </mat-form-field>
                </form>`,
    styleUrls: ['./key-search-bar.component.scss'],
})
export class KeySearchBarComponent {
    @Input() private keys;
    @Output() private valueChange = new EventEmitter();

    private searchTerm: string = '';

    private searchDebounced = _.debounce((x) => this.searchChanged(x), 250, { maxWait: 1000 });

    public searchChanged(term) {
        const keysFiltered = this.keys.filter((name) => name.search(term) !== -1);
        this.valueChange.emit(keysFiltered);
    }
}

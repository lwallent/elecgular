import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'icon-details-page',
    template: `<p>Selected key:  {{key}}</p>
                <div>Sizes</div><hr/>  
                <div fxLayout="row" fxLayoutAlign="space-evenly end">
                     <div *ngFor="let size of sizes"  fxLayout="column" fxLayoutAlign="start center">
                        <fa-icon fxFlex="90" [icon]="['fas', key]" size="{{size}}"></fa-icon>
                        <div fxFlex="10" class="icon-name">{{size}}</div>
                     </div>
                </div> `,
    styles: [`
                .icon-name {
                    font-size: 10px;
                }
    `],
})
export class PageIconDetailsComponent implements OnInit {
   
    key: string;

    sizes = ['xs', '1x', '2x', '3x', '4x', '5x', '6x' ]

    constructor(private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.route.params.subscribe((params)=> {
           this.key = params['name']; //it is passed as name for now
        });
    }
}
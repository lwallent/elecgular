import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'icon-details-page',
    template: `<div fxLayout="column" fxLayoutGap="20px" >
                    <div fxLayout="row" style="min-height:100px">
                        <div fxFlex="80%" height="100%" fxLayout="column" style="padding: 30px" >
                          
                                 <mat-slider [(ngModel)]="rotation" style="width:300px" thumbLabel tickInterval="10" min="0" max="360"></mat-slider>
                    
                            <mat-slide-toggle color="primary" [(ngModel)]="isSpinning"> Spinning </mat-slide-toggle>
                        </div>
                        <div fxFlex="20%" fxLayout="column" fxLayoutAlign="space-around center" class="row-presentation">
                            <code style="font-size:10pt">{{key}}</code>
                            
                            <div><fa-icon [spin]="isSpinning" [icon]="['fas', key]" size="3x" transform="rotate-{{rotation}}"></fa-icon></div>
                        </div>
                    </div>
                    

                    <div fxLayout="column" class="row-presentation">
                        <div class="row-label" >Sizes</div>
                        <div fxLayout="row" fxLayoutAlign="space-evenly end" >
                            <div *ngFor="let size of sizes"  fxLayout="column" fxLayoutAlign="start center">
                                <fa-icon fxFlex="90" [icon]="['fas', key]" size="{{size}}"></fa-icon>
                                <div fxFlex="10" class="icon-name">{{size}}</div>
                            </div>
                        </div> 
                    </div>
                </div>`,
    styleUrls: ['./icon-details-page.component.scss'],
})
export class PageIconDetailsComponent implements OnInit {
   
    key: string;

    rotation = 100;

    isSpinning =false;

    sizes = ['xs', '1x', '2x', '3x', '4x', '5x', '6x' ]

    constructor(private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.route.params.subscribe((params)=> {
           this.key = params['name']; //it is passed as name for now
        });
    }

    rotationChange(event) {
        console.log('value ->',event.value);
        this.rotation = event.value;
    }
}
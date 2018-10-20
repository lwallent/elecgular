import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'icon-details-page',
    template: `<div fxLayout="column" fxLayoutGap="20px" >
                    <div fxLayout="row" style="min-height:100px">
                        <div fxFlex="80%"  fxLayout="column" style="padding: 30px" >
                          
                            <mat-slider [(ngModel)]="rotation" style="width:300px" thumbLabel tickInterval="10" min="0" max="360"></mat-slider>
                    
                            <mat-slide-toggle color="primary" [(ngModel)]="isSpinning">Spinning</mat-slide-toggle>
                            <mat-slide-toggle color="primary" [(ngModel)]="isPulse">Pulse</mat-slide-toggle>
                            <mat-slide-toggle color="primary" (change)="solidChange($event)" [(ngModel)]="isSolid"> Solid </mat-slide-toggle>
                            <code style="font-size:10pt">{{key}}</code>
                            
                        </div>

                        <presentation-row fxFlex="20%" title="Result">
                            <div style="padding:25px">
                                <fa-icon [spin]="isSpinning" [pulse]="isPulse" [icon]="[iconVersion, key]" size="3x" transform="rotate-{{rotation}}"></fa-icon>
                            </div>
                        </presentation-row>
                        
                    </div>    

                    <presentation-row title="Sizes">
                        <div *ngFor="let size of sizes"  fxLayout="column" fxLayoutAlign="start center">
                            <fa-icon fxFlex="90" [icon]="[iconVersion, key]" size="{{size}}"></fa-icon>
                            <div fxFlex="10" class="icon-name">{{size}}</div>
                        </div>
                    </presentation-row>

                    <presentation-row title="Angles">
                        <div *ngFor="let angle of angles"  fxLayout="column" fxLayoutAlign="start center">
                            <fa-icon fxFlex="90" [icon]="[iconVersion, key]" size="2x" rotate="{{angle}}"></fa-icon>
                            <div fxFlex="10" class="icon-name">{{angle}}</div>
                        </div>
                    </presentation-row>

                    <presentation-row title="Flipping">
                        <div *ngFor="let flip of flipped"  fxLayout="column" fxLayoutAlign="start center">
                            <fa-icon fxFlex="90" [icon]="[iconVersion, key]" size="2x" flip="{{flip}}"></fa-icon>
                            <div fxFlex="10" class="icon-name">{{flip}}</div>
                        </div>
                    </presentation-row>
                    
                   
                </div>`,
    styleUrls: ['./icon-details-page.component.scss'],
})
export class PageIconDetailsComponent implements OnInit {
   
    key: string;
    iconVersion:string = 'far';

    rotation = 100;

    isSpinning =false;
    isPulse =false;
    isSolid =false;

    sizes = ['xs', '1x', '2x', '3x', '4x', '5x', '6x' ];

    angles = ['0', '90', '180', '270' ];

    flipped = ['horizontal', 'vertical', 'both' ];


    constructor(private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.route.params.subscribe((params)=> {
           this.key = params['name']; //it is passed as name for now
        });
    }

    rotationChange(event) {
        this.rotation = event.value;
    }

    solidChange(event) {
        this.iconVersion = this.isSolid? 'fas': 'far';
    }
}
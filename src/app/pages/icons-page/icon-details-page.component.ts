import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'icon-details-page',
    template: `<div fxLayout="column" fxLayoutGap="20px" >
                    <div fxLayout="row" style="min-height:100px">
                        <div fxFlex="80%"  fxLayout="column" style="padding: 30px" >

                            <mat-slider [(ngModel)]="rotation" style="width:300px" thumbLabel tickInterval="10" min="0" max="360"></mat-slider>

                            <div fxLayout="row" fxLayoutAlign="space-between center">
                                <mat-slide-toggle color="primary" [(ngModel)]="isSpinning">Spinning</mat-slide-toggle>
                                <mat-slide-toggle color="primary" [(ngModel)]="isPulse">Pulse</mat-slide-toggle>
                                <mat-slide-toggle color="primary" [(ngModel)]="isInverse">Inverse</mat-slide-toggle>
                                <mat-slide-toggle color="primary" (change)="solidChange($event)" [(ngModel)]="isSolid"> Solid </mat-slide-toggle>
                            </div>
                            <!-- <code style="font-size:8pt">
                                 &lt;fa-icon [inverse]="{{isInverse}}" [spin]="{{isSpinning}}" [pulse]="{{isPulse}}" [icon]="[{{iconVersion}}, {{key}}]" size="3x" transform="rotate-{{rotation}}"&gt;
                            </code> -->
                        </div>

                        <presentation-row fxFlex="20%" title="Result">
                            <div style="padding:25px">
                                <fa-icon [inverse]="isInverse" [spin]="isSpinning" [pulse]="isPulse" [icon]="[iconVersion, key]" size="3x" transform="rotate-{{rotation}}"></fa-icon>
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

                    <presentation-row title="As Icon Buttons">
                        <div fxLayout="column" fxLayoutAlign="start center">
                            <button mat-icon-button>
                                <fa-icon [icon]="[iconVersion, key]" ></fa-icon>
                            </button>
                            <div fxFlex="10" class="icon-name">Basic</div>
                        </div>
                        <div fxLayout="column" fxLayoutAlign="start center">
                            <button mat-icon-button color="primary">
                                <fa-icon [icon]="[iconVersion, key]" ></fa-icon>
                            </button>
                            <div fxFlex="10" class="icon-name">Primary</div>
                        </div>
                        <div fxLayout="column" fxLayoutAlign="start center">
                            <button mat-icon-button color="accent">
                                <fa-icon [icon]="[iconVersion, key]" ></fa-icon>
                            </button>
                            <div fxFlex="10" class="icon-name">Accent</div>
                        </div>
                        <div fxLayout="column" fxLayoutAlign="start center">
                            <button mat-icon-button color="warn">
                                <fa-icon [icon]="[iconVersion, key]" ></fa-icon>
                            </button>
                            <div fxFlex="10" class="icon-name">Warn</div>
                        </div>
                        <div fxLayout="column" fxLayoutAlign="start center">
                            <button mat-icon-button disabled>
                                <fa-icon [icon]="[iconVersion, key]" ></fa-icon>
                            </button>
                            <div fxFlex="10" class="icon-name">Disabled</div>
                        </div>
                  </presentation-row>
                  <presentation-row title="As Raised Buttons">
                        <button mat-raised-button>
                            <fa-icon [icon]="[iconVersion, key]" ></fa-icon> Basic
                        </button>
                        <button mat-raised-button color="primary">
                            <fa-icon [icon]="[iconVersion, key]" ></fa-icon> Primary
                        </button>
                        <button mat-raised-button color="accent">
                            <fa-icon [icon]="[iconVersion, key]" ></fa-icon> Accent
                        </button>
                        <button mat-raised-button color="warn">
                            <fa-icon [icon]="[iconVersion, key]" ></fa-icon> Warn
                        </button>
                        <button mat-raised-button disabled>
                            <fa-icon [icon]="[iconVersion, key]" ></fa-icon> Disabled
                        </button>
                  </presentation-row>
                  <div style="height:160px"></div> <!-- temp spacer -->
                </div>`,
    styleUrls: ['./icon-details-page.component.scss'],
})
export class PageIconDetailsComponent implements OnInit {

    public key: string;
    public iconVersion: string = 'far';

    public rotation = 100;

    public isSpinning = false;
    public isPulse = false;
    public isSolid = false;
    public isInverse = false;

    public sizes = ['xs', '1x', '2x', '3x', '4x', '5x', '6x' ];

    public angles = ['0', '90', '180', '270' ];

    public flipped = ['horizontal', 'vertical', 'both' ];

    constructor(private route: ActivatedRoute) {

    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
           this.key = params.name; // it is passed as name for now
        });
    }

    public rotationChange(event) {
        this.rotation = event.value;
    }

    public solidChange(event) {
        this.iconVersion = this.isSolid ? 'fas' : 'far';
    }
}

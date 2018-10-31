import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    template: `<div fxLayout="column" fxLayoutGap="20px" >
                <div fxLayout="row" style="min-height:100px">
                    <div fxFlex="80%"  fxLayout="column" style="padding: 30px" >
<!-- 
                        <mat-slider [(ngModel)]="rotation" style="width:300px" thumbLabel tickInterval="10" min="0" max="360"></mat-slider>

                        <div fxLayout="row" fxLayoutAlign="space-between center">
                            <mat-slide-toggle color="primary" [(ngModel)]="isSpinning">Spinning</mat-slide-toggle>
                            <mat-slide-toggle color="primary" [(ngModel)]="isPulse">Pulse</mat-slide-toggle>
                            <mat-slide-toggle color="primary" [(ngModel)]="isInverse">Inverse</mat-slide-toggle>
                            <mat-slide-toggle color="primary" (change)="solidChange($event)" [(ngModel)]="isSolid"> Solid </mat-slide-toggle>
                        </div>
                        <code style="font-size:8pt">
                            &lt;fa-icon [inverse]="{{isInverse}}" [spin]="{{isSpinning}}" [pulse]="{{isPulse}}" [icon]="[{{iconVersion}}, {{key}}]" size="3x" transform="rotate-{{rotation}}"&gt;
                        </code> -->
                    </div>

                    <presentation-row fxFlex="20%" title="Result">
                        <div style="padding:25px">
                            <mat-icon>{{key}}</mat-icon>
                        </div>
                    </presentation-row>
                </div>

                <presentation-row title="Sizes">
                    <div *ngFor="let size of sizes" fxLayout="column" fxLayoutAlign="start center">
                        <mat-icon fxG    ngClass="size-{{size}}">{{key}}</mat-icon>
                        <div  class="icon-name">{{size}}</div>
                    </div>
                </presentation-row>

                <presentation-row title="As Icon Buttons">
                    <div fxLayout="column" fxLayoutAlign="start center">
                        <button mat-icon-button>
                            <mat-icon>{{key}}</mat-icon>
                        </button>
                        <div fxFlex="10" class="icon-name">Basic</div>
                    </div>
                    <div fxLayout="column" fxLayoutAlign="start center">
                        <button mat-icon-button color="primary">
                             <mat-icon>{{key}}</mat-icon>
                        </button>
                        <div fxFlex="10" class="icon-name">Primary</div>
                    </div>
                    <div fxLayout="column" fxLayoutAlign="start center">
                        <button mat-icon-button color="accent">
                            <mat-icon>{{key}}</mat-icon>
                        </button>
                        <div fxFlex="10" class="icon-name">Accent</div>
                    </div>
                    <div fxLayout="column" fxLayoutAlign="start center">
                        <button mat-icon-button color="warn">
                            <mat-icon>{{key}}</mat-icon>
                        </button>
                        <div fxFlex="10" class="icon-name">Warn</div>
                    </div>
                    <div fxLayout="column" fxLayoutAlign="start center">
                        <button mat-icon-button disabled>
                            <mat-icon>{{key}}</mat-icon>
                        </button>
                        <div fxFlex="10" class="icon-name">Disabled</div>
                    </div>
            </presentation-row>
            <presentation-row title="As Raised Buttons">
                    <button mat-raised-button>
                        <mat-icon>{{key}}</mat-icon> Basic
                    </button>
                    <button mat-raised-button color="primary">
                        <mat-icon>{{key}}</mat-icon> Primary
                    </button>
                    <button mat-raised-button color="accent">
                        <mat-icon>{{key}}</mat-icon> Accent
                    </button>
                    <button mat-raised-button color="warn">
                        <mat-icon>{{key}}</mat-icon> Warn
                    </button>
                    <button mat-raised-button disabled>
                        <mat-icon>{{key}}</mat-icon> Disabled
                    </button>
            </presentation-row>
            <div style="height:160px"></div> <!-- temp spacer -->
            </div>`,
            styleUrls: ['./mat-details.component.scss'],
})
export class MatDetailsComponent implements OnInit {

    public sizes = [ '1x', '2x', '3x', '4x', '5x', '6x' ];
    private key: string;

    constructor(private route: ActivatedRoute) {}

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
           this.key = params.name; // it is passed as name for now
        });
    }
}

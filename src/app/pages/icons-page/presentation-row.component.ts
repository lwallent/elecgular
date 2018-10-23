import { Component, Input } from '@angular/core';

@Component({
    selector: 'presentation-row',
    template: `<div fxLayout="column" class="row-presentation">
                    <div class="row-label" >{{title}}</div>
                    <div fxLayout="row" fxLayoutAlign="space-evenly end" >
                        <ng-content></ng-content>
                    </div>
                </div>`,
    styleUrls: ['./presentation-row.component.scss'],
})
export class PresentationRowComponent {
    @Input() public title: string;
}

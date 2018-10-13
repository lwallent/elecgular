import { Component, Input } from "@angular/core";

@Component({
    selector: 'title-page',
    template: `<h1><ng-content></ng-content></h1><hr/>`,
    styleUrls: ['./title-page.component.scss'],
})
export class TitlePageComponent {
}
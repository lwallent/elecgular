
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FloorComponent } from './floor.component';
import { FloorRoutes } from './floor.routing';
import { PixiComponent } from './pixi.component';

@NgModule({
    imports: [
        RouterModule.forChild(FloorRoutes),
    ],
    declarations: [
        FloorComponent,
        PixiComponent,
    ],
    providers: [],
})
export class FloorModule {

}

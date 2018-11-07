
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FloorComponent } from './floor.component';
import { FloorRoutes } from './floor.routing';

@NgModule({
    imports: [
        RouterModule.forChild(FloorRoutes),
    ],
    declarations: [
        FloorComponent,
    ],
    providers: [],
})
export class FloorModule {

}

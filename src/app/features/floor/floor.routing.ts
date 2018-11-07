import { Routes } from '@angular/router';
import { FloorComponent } from './floor.component';

export const FloorRoutes: Routes = [
    { path: 'floor',  component: FloorComponent, data: { titleKey: 'title.FLOOR_VIEW' } },
];

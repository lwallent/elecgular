import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { GlyphIconPageComponent } from './pages/icons-page/glyph-icon-page.component';
import { PageIconDetailsComponent } from './pages/icons-page/icon-details-page.component';
import { PageIconsComponent } from './pages/icons-page/icons-page.component';
import { MatIconPageComponent } from './pages/icons-page/mat-icon-page.component';

const routes: Routes = [
    { path: 'icons/fa/details/:name',  component: PageIconDetailsComponent, data: { titleKey: 'title.ICON_DETAILS' } },
    { path: 'icons/fa',  component: PageIconsComponent, data: { titleKey: 'title.FA_ICON_OVERVIEW'} },
    { path: 'icons/glyph',  component: GlyphIconPageComponent, data: { titleKey: 'title.GLYPH_ICON_OVERVIEW'} },
    { path: 'icons/mat',  component: MatIconPageComponent, data: { titleKey: 'title.MAT_ICON_OVERVIEW'} },
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes,  {useHash: true})],
    exports: [RouterModule],
})
export class AppRoutingModule {

}

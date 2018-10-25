import { Routes } from "@angular/router";
import { PageIconDetailsComponent } from "./icon-details-page.component";
import { PageIconsComponent } from "./icons-page.component";
import { GlyphIconPageComponent } from "./glyph-icon-page.component";
import { MatIconPageComponent } from "./mat-icon-page.component";

export const IconRoutes: Routes = [
    { path: 'icons/fa/details/:name',  component: PageIconDetailsComponent, data: { titleKey: 'title.ICON_DETAILS' } },
    { path: 'icons/fa',  component: PageIconsComponent, data: { titleKey: 'title.FA_ICON_OVERVIEW'} },
    { path: 'icons/glyph',  component: GlyphIconPageComponent, data: { titleKey: 'title.GLYPH_ICON_OVERVIEW'} },
    { path: 'icons/mat',  component: MatIconPageComponent, data: { titleKey: 'title.MAT_ICON_OVERVIEW'} },
];
import { Routes } from '@angular/router';
import { FaDetailsComponent } from './fa-details.component';
import { FaOverviewComponent } from './fa-overview.component';
import { GlyphOverviewComponent } from './glyph-overview.component';
import { MatDetailsComponent } from './mat-details.component';
import { MatOverviewComponent } from './mat-overview.component';

export const IconRoutes: Routes = [
    { path: 'icons/fa/details/:name',  component: FaDetailsComponent, data: { titleKey: 'title.ICON_DETAILS' } },
    { path: 'icons/fa',  component: FaOverviewComponent, data: { titleKey: 'title.FA_ICON_OVERVIEW'} },
    { path: 'icons/glyph',  component: GlyphOverviewComponent, data: { titleKey: 'title.GLYPH_ICON_OVERVIEW'} },
    { path: 'icons/mat/details/:name',  component: MatDetailsComponent, data: { titleKey: 'title.ICON_DETAILS'} },
    { path: 'icons/mat',  component: MatOverviewComponent, data: { titleKey: 'title.MAT_ICON_OVERVIEW'} },
];

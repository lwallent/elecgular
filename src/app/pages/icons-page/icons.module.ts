import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaOverviewComponent } from './fa-overview.component';

import { library } from '@fortawesome/fontawesome-svg-core';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatGridListModule, MatInputModule, MatSliderModule, MatSlideToggleModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FaDetailsComponent } from './fa-details.component';
import { GlyphOverviewComponent } from './glyph-overview.component';
import { IconRoutes } from './icons.routing';
import { MatOverviewComponent } from './mat-overview.component';
import { PresentationRowComponent } from './presentation-row.component';
// Adding all the modules, not the normal recommended way ...
library.add(fas, far);

@NgModule({
    declarations: [
        FaOverviewComponent,
        FaDetailsComponent,
        PresentationRowComponent,
        GlyphOverviewComponent,
        MatOverviewComponent,
    ],
    imports: [
      FontAwesomeModule,
      CommonModule,
      MatGridListModule,
      MatFormFieldModule,
      MatInputModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatButtonModule,
      FormsModule,
      FlexLayoutModule,
      RouterModule.forChild(IconRoutes),
    ],
    providers: [],
    exports: [
      // PageIconsComponent,
      // GlyphIconPageComponent,
      // MatIconPageComponent,
    ],
  })
  export class PageIconsModule { }

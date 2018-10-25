import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageIconsComponent } from './icons-page.component';

import { library } from '@fortawesome/fontawesome-svg-core';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatGridListModule, MatInputModule, MatSliderModule, MatSlideToggleModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { GlyphIconPageComponent } from './glyph-icon-page.component';
import { PageIconDetailsComponent } from './icon-details-page.component';
import { MatIconPageComponent } from './mat-icon-page.component';
import { PresentationRowComponent } from './presentation-row.component';
import { IconRoutes } from './icons.routing';
// Adding all the modules, not the normal recommended way ...
library.add(fas, far);

@NgModule({
    declarations: [
        PageIconsComponent,
        PageIconDetailsComponent,
        PresentationRowComponent,
        GlyphIconPageComponent,
        MatIconPageComponent,
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
      PageIconsComponent,
      GlyphIconPageComponent,
      MatIconPageComponent,
    ],
  })
  export class PageIconsModule { }

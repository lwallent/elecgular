import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgModule } from '@angular/core';
import { PageIconsComponent } from './icons-page.component';

import { library }  from '@fortawesome/fontawesome-svg-core';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { CommonModule } from '@angular/common';
import { MatGridListModule, MatFormFieldModule, MatInputModule, MatSliderModule, MatSlideToggleModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { PageIconDetailsComponent } from './icon-details-page.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PresentationRowComponent } from './presentation-row.component';
import { GlyphIconPageComponent } from './glyph-icon-page.component';
import { MatIconPageComponent } from './mat-icon-page.component';
 
//Adding all the modules, not the normal recommended way ...
library.add(fas, far);

@NgModule({
    declarations: [
        PageIconsComponent,
        PageIconDetailsComponent,
        PresentationRowComponent,
        GlyphIconPageComponent,
        MatIconPageComponent
    ],
    imports: [
      FontAwesomeModule, 
      CommonModule,  
      MatGridListModule, 
      MatFormFieldModule, 
      MatInputModule, 
      MatSliderModule,
      MatSlideToggleModule,
      FormsModule,
      FlexLayoutModule,
      RouterModule
    ],
    providers: [],
    exports: [
      PageIconsComponent,
      GlyphIconPageComponent,
      MatIconPageComponent
    ]
  })
  export class PageIconsModule { }
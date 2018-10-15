import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgModule } from '@angular/core';
import { PageIconsComponent } from './icons-page.component';

import { library }  from '@fortawesome/fontawesome-svg-core';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { CommonModule } from '@angular/common';
import { MatGridListModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { PageIconDetailsComponent } from './icon-details-page.component';
import { RouterModule } from '@angular/router';
 
//Adding all the modules, not the normal recommended way ...
library.add(fas, far);

// Add an icon to the library for convenient access in other components
//library.add(faCoffee);


@NgModule({
    declarations: [
        PageIconsComponent,
        PageIconDetailsComponent,
    ],
    imports: [
      FontAwesomeModule, 
      CommonModule,  
      MatGridListModule, 
      MatFormFieldModule, 
      MatInputModule, 
      FormsModule,
      RouterModule
    ],
    providers: [],
    exports: [PageIconsComponent]
  })
  export class PageIconsModule { }
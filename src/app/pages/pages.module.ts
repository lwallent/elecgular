import { NgModule } from '@angular/core';
import { PageThingyComponent } from './thingy/page.thingy.component';
import { PageStuffComponent } from './sfuff/stuff.component';
import { PageIconsModule } from './icons-page/icons-page.module';

@NgModule({
    declarations: [
        PageThingyComponent, 
        PageStuffComponent,
    ],
    exports: [
        PageThingyComponent, 
        PageStuffComponent,
        PageIconsModule
    ]

})
export class PagesModule {}
import { NgModule } from '@angular/core';
import { PageThingyComponent } from './thingy/page.thingy.component';
import { PageStuffComponent } from './sfuff/stuff.component';

@NgModule({
    declarations: [PageThingyComponent, PageStuffComponent],
    exports: [PageThingyComponent, PageStuffComponent]

})
export class PagesModule {}
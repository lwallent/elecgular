import { NgModule } from "@angular/core";
import {RouterModule, Routes} from "@angular/router"
import { PageThingyComponent } from "./pages/thingy/page.thingy.component";
import { PageStuffComponent } from "./pages/sfuff/stuff.component";
import { CommonModule } from "@angular/common";
import { PageIconsComponent } from "./pages/icons-page/icons-page.component";
import { PageIconDetailsComponent } from "./pages/icons-page/icon-details-page.component";

const routes: Routes = [
    { path: '', component: PageThingyComponent },
    { path: 'thingy', component: PageThingyComponent, data: { titleKey: 'title.THINGY' }},
    { path: 'stuff',  component: PageStuffComponent, data: { titleKey: 'title.STUFF' } },
    { path: 'icons/details/:name',  component: PageIconDetailsComponent, data: { titleKey: 'title.ICON_DETAILS' } },
    { path: 'icons',  component: PageIconsComponent, data: { titleKey: 'title.ICON_OVERVIEW'} }
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes,  {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}


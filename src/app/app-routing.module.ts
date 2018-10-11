import { NgModule } from "@angular/core";
import {RouterModule, Routes} from "@angular/router"
import { PageThingyComponent } from "./pages/thingy/page.thingy.component";
import { PageStuffComponent } from "./pages/sfuff/stuff.component";
import { CommonModule } from "@angular/common";
import { PageIconsComponent } from "./pages/icons-page/icons-page.component";

const routes: Routes = [
    { path: '', component: PageThingyComponent },
    { path: 'thingy', component: PageThingyComponent },
    { path: 'stuff',  component: PageStuffComponent },
    { path: 'icons-page',  component: PageIconsComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes,  {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}


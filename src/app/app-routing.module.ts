import { NgModule } from "@angular/core";
import {RouterModule, Routes} from "@angular/router"
import { PageThingyComponent } from "./pages/thingy/page.thingy.component";
import { PageStuffComponent } from "./pages/sfuff/stuff.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
    { path: '', component: PageThingyComponent },
    { path: 'thingy', component: PageThingyComponent },
    { path: 'stuff',  component: PageStuffComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes,  {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}


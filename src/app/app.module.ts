import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {UtilsService} from "./services/utils.service";
import {ShortcutsService} from "./services/shortcuts.service";
import {DialogService} from "./services/dialog.service";
import {SettingsComponent} from "./components/settings/settings.component";
import {SettingsService} from "./services/settings.service";
import {NotificationsService} from "./services/notifications.service";
import {StorageService} from "./services/storage.service";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {UpdateService} from "./services/update.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule, MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule
} from "@angular/material";
import {AboutComponent} from "./components/about/about.component";
import {FooterComponent} from "./components/footer/footer.component";
import {ShortcutsComponent} from "./components/shortcuts/shortcuts.component";
import {SidenavComponent} from "./components/sidenav/sidenav.component";
import {AppComponent} from "./components/app.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from "./app-routing.module";
import { RouteTitleComponent } from "./components/route-title/route-title.component";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/");
}

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        SettingsComponent,
        ShortcutsComponent,
        AboutComponent,
        FooterComponent,
        SidenavComponent,
        RouteTitleComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatMenuModule,
        MatToolbarModule,
        MatCardModule,
        MatSidenavModule,
        MatInputModule,
        MatDialogModule,
        MatListModule,
        MatTabsModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatSliderModule,
        FlexLayoutModule,
        PagesModule,
        AppRoutingModule
    ],
    providers: [
        DialogService,
        ShortcutsService,
        UpdateService,
        UtilsService,
        SettingsService,
        StorageService,
        NotificationsService
    ],
    entryComponents: [
        ShortcutsComponent,
        SettingsComponent,
        AboutComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

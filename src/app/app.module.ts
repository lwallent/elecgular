import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
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
    MatToolbarModule,
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AboutComponent} from './components/about/about.component';
import {AppComponent} from './components/app.component';
import {FooterComponent} from './components/footer/footer.component';
import {RouteTitleComponent} from './components/route-title/route-title.component';
import {SettingsComponent} from './components/settings/settings.component';
import {ShortcutsComponent} from './components/shortcuts/shortcuts.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {PagesModule} from './pages/pages.module';
import {DialogService} from './services/dialog.service';
import {NotificationsService} from './services/notifications.service';
import {SettingsService} from './services/settings.service';
import {ShortcutsService} from './services/shortcuts.service';
import {StorageService} from './services/storage.service';
import {UpdateService} from './services/update.service';
import {UtilsService} from './services/utils.service';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/');
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
        RouteTitleComponent,
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
                deps: [HttpClient],
            },
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
        RouterModule.forRoot( AppRoutes,  {useHash: true}),
    ],
    providers: [
        DialogService,
        ShortcutsService,
        UpdateService,
        UtilsService,
        SettingsService,
        StorageService,
        NotificationsService,
    ],
    entryComponents: [
        ShortcutsComponent,
        SettingsComponent,
        AboutComponent,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}

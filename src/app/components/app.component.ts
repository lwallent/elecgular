import {animate, style, transition, trigger} from '@angular/animations';
import {Component, ElementRef, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import * as fs from 'fs';
import {ISettings} from '../models/settings';
import {DialogService} from '../services/dialog.service';
import {NotificationsService} from '../services/notifications.service';
import {SettingsService} from '../services/settings.service';
import {ShortcutsService} from '../services/shortcuts.service';
import {UpdateService} from '../services/update.service';

@Component({
    selector: 'app-root',
    template: `<div style="height:100%" fxLayout="column">
                  <app-toolbar [sidenav]="sidenav" fxFlex="45px"></app-toolbar>
                  <mat-sidenav-container autosize fxFlex >
                    <mat-sidenav #sidenav mode="side" position="start" opened >
                        <app-sidenav [sidenav]="sidenav"></app-sidenav>
                    </mat-sidenav>
                    <mat-sidenav-content>
                        <route-title></route-title>
                        <div [@fadeInOut] style="overflow-y:scroll;">
                            <router-outlet></router-outlet>
                        </div>
                    </mat-sidenav-content>
                 </mat-sidenav-container>
                <app-footer fxFlex="30px" ></app-footer>
            </div>`,
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({opacity: 0}),
                animate(600, style({opacity: 1})),
            ]),
            transition(':leave', [
                animate(600, style({opacity: 0})),
            ]),
        ]),
    ],
})
export class AppComponent implements OnInit {

    public fs: typeof fs;

    public arguments: string[];

    constructor(public myElement: ElementRef,
                public dialogService: DialogService,
                public updateService: UpdateService,
                public notificationService: NotificationsService,
                public translateService: TranslateService,
                public settingsService: SettingsService,
                public shortcutsService: ShortcutsService) {

        this.fs = window.require('fs');
        this.arguments = window.require('electron').remote.getGlobal('arguments');
    }

    public ngOnInit() {
        // Settings initialization
        this.settingsService.init().then((settings: ISettings) => {

            this.setTranslations(settings.general.language).then((translations) => {
                // Create the electron menu.
                this.shortcutsService.createShortcuts();

                // Create contents

                // Initialize  listeners
                this.updateService.createUpdateListener();

                if (settings.general.firstTime === true) {
                    this.settingsService.setFirstTime();
                    this.notificationService.send(translations.WELCOME_MESSAGE);
                }

                this.notificationService.setInformations(translations.INITIAL_INFORMATION, 4000);
            });
        });
    }

    public ngAfterViewInit() {
        const appRootRef = this.myElement;

        setTimeout(() => {
            appRootRef.nativeElement.previousElementSibling.remove();
        }, 800);
    }

    public setTranslations(language: string): Promise<any> {
        this.translateService.setDefaultLang(language);
        return this.translateService.use(language).toPromise();
    }
}

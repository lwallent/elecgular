import {Component, ElementRef, OnInit} from "@angular/core";
import {DialogService} from "../services/dialog.service";
import {ShortcutsService} from "../services/shortcuts.service";
import {TranslateService} from "@ngx-translate/core";
import {SettingsService} from "../services/settings.service";
import {Settings} from "../models/settings";
import {UpdateService} from "../services/update.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {NotificationsService} from "../services/notifications.service";
import * as fs from "fs";

@Component({
    selector: "app-root",
    template: `<app-toolbar [sidenav]="sidenav"></app-toolbar>
                <mat-sidenav-container autosize >
                <mat-sidenav #sidenav mode="side" position="start" opened >
                    <app-sidenav [sidenav]="sidenav"></app-sidenav>
                </mat-sidenav>
                <mat-sidenav-content>
                    <div [@fadeInOut]>
                    
                    </div>
                </mat-sidenav-content>
            </mat-sidenav-container>
            <app-footer></app-footer>`,
    styleUrls: ["./app.component.scss"],
    animations: [
        trigger("fadeInOut", [
            transition(":enter", [
                style({opacity: 0}),
                animate(600, style({opacity: 1}))
            ]),
            transition(":leave", [
                animate(600, style({opacity: 0}))
            ])
        ])
    ]
})
export class AppComponent implements OnInit {

    public fs: typeof fs;

    public arguments: Array<string>;

    constructor(public myElement: ElementRef,
                public dialogService: DialogService,
                public updateService: UpdateService,
                public notificationService: NotificationsService,
                public translateService: TranslateService,
                public settingsService: SettingsService,
                public shortcutsService: ShortcutsService) {

        this.fs = window.require("fs");
        this.arguments = window.require("electron").remote.getGlobal("arguments");
    }

    ngOnInit() {
        // Settings initialization
        this.settingsService.init().then((settings: Settings) => {

            this.setTranslations(settings.general.language).then((translations) => {
                // Create the electron menu.
                this.shortcutsService.createShortcuts();

                // Create contents
               

                // Initialize  listeners
                this.updateService.createUpdateListener();

                if (settings.general.firstTime === true) {
                    this.settingsService.setFirstTime();
                    this.notificationService.send(translations["WELCOME_MESSAGE"]);
                }

                this.notificationService.setInformations(translations["INITIAL_INFORMATION"], 4000);
            });
        });
    }

    ngAfterViewInit() {
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

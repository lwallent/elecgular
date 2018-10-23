import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ISettings} from '../../models/settings';
import {SettingsService} from '../../services/settings.service';
@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

    public settings: ISettings;

    public titles: any;

    public languages: string[];

    constructor(public settingsService: SettingsService,
                public translateService: TranslateService) {
    }

    public ngOnInit() {
        this.settings = this.settingsService.getSettings();

        this.titles = {};
        // tslint:disable-next-line:forin
        for (const title in this.settings) {
            this.titles[title] = 'SETTINGS_LABELS.' + title.split(/(?=[A-Z])/).join('_').toUpperCase();
        }

        this.languages = ['en', 'dk'];
    }

    public setLanguage() {
        this.settingsService.setLanguage(this.settings.general.language).then((settings: ISettings) => {
            this.translateService.use(settings.general.language);

            this.settings = settings;
        });
    }

}

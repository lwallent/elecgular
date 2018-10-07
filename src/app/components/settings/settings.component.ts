import {Component, OnInit} from "@angular/core";
import {Settings} from "../../models/settings";
import {SettingsService} from "../../services/settings.service";
import {TranslateService} from "@ngx-translate/core";
@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {

    public settings: Settings;

    public titles: any;

    public languages: Array<string>;

    constructor(public settingsService: SettingsService,
                public translateService: TranslateService) {
    }

    ngOnInit() {
        this.settings = this.settingsService.getSettings();

        this.titles = {};
        for (let title in this.settings) {
            this.titles[title] = "SETTINGS_LABELS." + title.split(/(?=[A-Z])/).join("_").toUpperCase();
        }

        this.languages = ["en", "dk"];
    }


    public setLanguage() {
        this.settingsService.setLanguage(this.settings.general.language).then((settings: Settings) => {
            this.translateService.use(settings.general.language);

            this.settings = settings;
        });
    }

}

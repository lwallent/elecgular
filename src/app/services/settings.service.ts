import {Injectable} from "@angular/core";
import {StorageService} from "./storage.service";
import {Settings} from "../models/settings";
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {UtilsService} from "./utils.service";

@Injectable()
export class SettingsService {

    private readonly SETTINGS_KEY: string = "settings";
    private readonly DEFAULT_SETTINGS_URL: string = "./assets/data/defaultSettings.json";

    private settings: Settings;

    constructor(private storageService: StorageService,
                private http: HttpClient,
                private utilsService: UtilsService) {
    }

    /**
     * Initialize the settingsService with default or saved values and return them.
     * @returns {Promise<Settings>}
     */
    public init(): Promise<Settings> {
        return this.storageService.exist(this.SETTINGS_KEY).then((exist: any) => {
            if (!exist) {
                return this.getDefaultSettings().then((defaultSettings: Settings) => {
                    return this.storageService.set(this.SETTINGS_KEY, defaultSettings);
                });
            } else {
                return this.storageService.get(this.SETTINGS_KEY);
            }
        }).then((settings: Settings) => {
            return this.getDefaultSettings().then((defaultSettings: Settings) => {
                if (!this.utilsService.haveSameStructure(defaultSettings, settings)) {
                    this.settings = defaultSettings;

                    return this.update();
                } else {
                    this.settings = settings;

                    return settings;
                }
            });
        });
    }

    /**
     * Set the first time (of the app start) to false.
     * @returns {Promise<Settings>}
     */
    public setFirstTime(): Promise<Settings> {
        this.settings.general.firstTime = false;

        return this.update();
    }


    /**
     * Set the new language and update the settingsService.
     * @param {string} language
     * @returns {Promise<Settings>}
     */
    public setLanguage(language: string): Promise<Settings> {
        this.settings.general.language = language;

        return this.update();
    }

    /**
     * Return a copy of the current settingsService.
     * @returns {Settings}
     */
    public getSettings(): Settings {
        return JSON.parse(JSON.stringify(this.settings));
    }

    /**
     * Return the default settingsService.
     * @returns {Promise<Settings>}
     */
    private getDefaultSettings(): Promise<Settings> {
        return this.http.get(this.DEFAULT_SETTINGS_URL).toPromise().then((settings: Settings) => {
            return settings;
        });
    }

    /**
     * Overwrite the settings in the storage.
     * @returns {Promise<Settings>}
     */
    private update(): Promise<Settings> {
        return this.storageService.set(this.SETTINGS_KEY, this.settings);
    }

}

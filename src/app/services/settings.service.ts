import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ISettings} from '../models/settings';
import {StorageService} from './storage.service';
import {UtilsService} from './utils.service';

@Injectable()
export class SettingsService {

    private readonly SETTINGS_KEY: string = 'settings';
    private readonly DEFAULT_SETTINGS_URL: string = './assets/data/defaultSettings.json';

    private settings: ISettings;

    constructor(private storageService: StorageService,
                private http: HttpClient,
                private utilsService: UtilsService) {
    }

    /**
     * Initialize the settingsService with default or saved values and return them.
     * @returns {Promise<ISettings>}
     */
    public init(): Promise<ISettings> {
        return this.storageService.exist(this.SETTINGS_KEY).then((exist: any) => {
            if (!exist) {
                return this.getDefaultSettings().then((defaultSettings: ISettings) => {
                    return this.storageService.set(this.SETTINGS_KEY, defaultSettings);
                });
            } else {
                return this.storageService.get(this.SETTINGS_KEY);
            }
        }).then((settings: ISettings) => {
            return this.getDefaultSettings().then((defaultSettings: ISettings) => {
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
     * @returns {Promise<ISettings>}
     */
    public setFirstTime(): Promise<ISettings> {
        this.settings.general.firstTime = false;

        return this.update();
    }

    /**
     * Set the new language and update the settingsService.
     * @param {string} language
     * @returns {Promise<ISettings>}
     */
    public setLanguage(language: string): Promise<ISettings> {
        this.settings.general.language = language;

        return this.update();
    }

    /**
     * Return a copy of the current settingsService.
     * @returns {ISettings}
     */
    public getSettings(): ISettings {
        return JSON.parse(JSON.stringify(this.settings));
    }

    /**
     * Return the default settingsService.
     * @returns {Promise<ISettings>}
     */
    private getDefaultSettings(): Promise<ISettings> {
        return this.http.get(this.DEFAULT_SETTINGS_URL).toPromise().then((settings: ISettings) => {
            return settings;
        });
    }

    /**
     * Overwrite the settings in the storage.
     * @returns {Promise<ISettings>}
     */
    private update(): Promise<ISettings> {
        return this.storageService.set(this.SETTINGS_KEY, this.settings);
    }

}

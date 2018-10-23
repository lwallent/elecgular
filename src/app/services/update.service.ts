import {Injectable} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {ipcRenderer} from 'electron';
import {DialogService} from './dialog.service';

@Injectable()
export class UpdateService {

    private ipcRenderer: typeof ipcRenderer;

    private translations: any;

    constructor(private translateService: TranslateService,
                private dialogService: DialogService) {
        this.ipcRenderer = window.require('electron').ipcRenderer;

        this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.translations = event.translations;
        });
    }

    public createUpdateListener() {
        this.ipcRenderer.send('check-updates');

        this.ipcRenderer.once('update-available', () => {
            this.ipcRenderer.send('show-update-available-dialog', {
                type: 'question',
                title: this.translations.UPDATES_FOUND_TITLE,
                message: this.translations.UPDATES_FOUND_MESSAGE,
                buttons: [this.translations.YES, this.translations.NO],
            });
        });

        this.ipcRenderer.once('update-downloaded', () => {
                this.ipcRenderer.send('show-update-downloaded-dialog', {
                    type: 'info',
                    title: this.translations.INSTALL_UPDATES_TITLE,
                    message: this.translations.INSTALL_UPDATES_MESSAGE,
                    buttons: [this.translations.OK, this.translations.LATER],
                });
        });
    }
}

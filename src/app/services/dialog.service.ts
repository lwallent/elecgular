import {Injectable, NgZone} from '@angular/core';
import {MatDialog} from '@angular/material';
import {MatDialogRef} from '@angular/material/dialog/typings/dialog-ref';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {remote} from 'electron';
import {environment} from '../../environments/environment';
import {AboutComponent} from '../components/about/about.component';
import {SettingsComponent} from '../components/settings/settings.component';
import {ShortcutsComponent} from '../components/shortcuts/shortcuts.component';

export type DialogType =  'settings' | 'about' | 'shortcuts';

@Injectable()
export class DialogService {

    private remote: typeof remote;
    private matDialogRefs: Map<string, MatDialogRef<any>>;
    private translations: any;

    constructor(private ngZone: NgZone,
                private translateService: TranslateService,
                private matDialog: MatDialog) {
        this.remote = window.require('electron').remote;
        this.matDialogRefs = new Map();
        this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.translations = event.translations;
        });
    }

    /**
     * Show a message dialog.
     * @param {string} title
     * @param {string} message
     * @returns {Promise<number>}
     */
    public showMessage(title: string, message: string): Promise<number> {
        return new Promise((resolve: Function) => {
            this.remote.dialog.showMessageBox({
                type: 'question',
                title,
                message,
                buttons: [
                    this.translations.YES,
                    this.translations.NO,
                    this.translations.CANCEL,
                ],
            }, (index) => {
                resolve(index);
            });
        });
    }

    /**
     * Open a dialog
     */
    public openMatDialog(name: DialogType) {

        const configLarge = {
            hasBackdrop: false,
            maxWidth: '100vw',
            maxHeight: '100vh',
            height: '100%',
            width: '100%',
        };

        switch (name) {
            case 'settings':
                this.matDialogRefs.set('settings', this.matDialog.open(SettingsComponent, configLarge));
                break;
            case 'shortcuts':
                this.matDialogRefs.set('shortcuts', this.matDialog.open(ShortcutsComponent, configLarge));
                break;
            case 'about':
                this.matDialogRefs.set('about', this.matDialog.open(AboutComponent));
        }
    }

    /**
     * Close a dialog
     */
    public closeMatDialog(name: DialogType) {
        switch (name) {
            case 'settings':
                this.matDialogRefs.get('settings').close();
                break;
            case 'shortcuts':
                this.matDialogRefs.get('shortcuts').close();
                break;
            case 'about':
                this.matDialogRefs.get('about').close();
        }
    }

    /**
     * Return true if the corresponding dialog is open.
     * @returns {boolean}
     */
    public getMatDialogStatus(name: DialogType): boolean {
        let ref: MatDialogRef<any>;

        switch (name) {
            case 'settings':
                ref = this.matDialogRefs.get('settings');
                return ref && !!ref.componentInstance;
            case 'shortcuts':
                ref = this.matDialogRefs.get('shortcuts');
                return ref && !!ref.componentInstance;
            case 'about':
                ref = this.matDialogRefs.get('about');
                return ref && !!ref.componentInstance;
        }
    }
}

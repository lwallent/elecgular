import {Injectable, NgZone} from '@angular/core';
import * as mousetrap from 'mousetrap';
import {DialogService, DialogType} from './dialog.service';

@Injectable()
export class ShortcutsService {

    constructor(private ngZone: NgZone,
                private dialogService: DialogService) {
    }

    /**
     * Set some global shortcuts.
     */
    public createShortcuts() {

        const toggleDialog = (name: DialogType) => {
            if (this.dialogService.getMatDialogStatus(name)) {
                this.dialogService.closeMatDialog(name);
            } else {
                this.dialogService.openMatDialog(name);
            }
        };

        mousetrap.bind('esc', () => {
            this.ngZone.run(() => {
                if (this.dialogService.getMatDialogStatus('settings')) {
                    this.dialogService.closeMatDialog('settings');
                }

                if (this.dialogService.getMatDialogStatus('about')) {
                    this.dialogService.closeMatDialog('about');
                }
            });
        });

        mousetrap.bind('f2', () => {
            this.ngZone.run(() => {
                // Rename ....
            });
        });

        mousetrap.bind('?', () => {
            this.ngZone.run(() => toggleDialog('shortcuts'));
        });

        mousetrap.bind('ctrl+alt+s', () => {
            this.ngZone.run(() => toggleDialog('settings'));
        });
    }
}

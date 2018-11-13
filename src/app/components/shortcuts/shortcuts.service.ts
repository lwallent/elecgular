import {Injectable, NgZone} from '@angular/core';
import * as mousetrap from 'mousetrap';
import { DialogService, DialogType } from '../../services/dialog.service';
import { IAction } from '../toolbar/toolbar.service';

@Injectable()
export class ShortcutsService {

    constructor(private ngZone: NgZone,
                private dialogService: DialogService) {
    }

    public addAction(action: IAction) {
        if (action.shortcut && action.action) {
            mousetrap.bind(action.shortcut, action.action);
        }
    }

    public removeAction(action: IAction) {
        if (action.shortcut) {
            mousetrap.unbind(action.shortcut);
        }
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

        mousetrap.bind('?', () => {
            this.ngZone.run(() => toggleDialog('shortcuts'));
        });

        mousetrap.bind('ctrl+alt+s', () => {
            this.ngZone.run(() => toggleDialog('settings'));
        });
    }


}

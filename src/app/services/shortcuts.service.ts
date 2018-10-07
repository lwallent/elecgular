import {Injectable, NgZone} from "@angular/core";
import {DialogService} from "./dialog.service";
import * as mousetrap from "mousetrap";

@Injectable()
export class ShortcutsService {

    constructor(private ngZone: NgZone,
                private dialogService: DialogService) {
    }

    /**
     * Set some global shortcuts.
     */
    public createShortcuts() {
        mousetrap.bind("esc", () => {
            this.ngZone.run(() => {
                if (this.dialogService.getMatDialogStatus("settings")) {
                    this.dialogService.closeMatDialog("settings");
                }

                if (this.dialogService.getMatDialogStatus("about")) {
                    this.dialogService.closeMatDialog("about");
                }
            });
        });

        mousetrap.bind("f2", () => {
            this.ngZone.run(() => {
                // Rename ....
            });
        });

   

        mousetrap.bind("?", () => {
            this.ngZone.run(() => {
                if (this.dialogService.getMatDialogStatus("shortcuts")) {
                    this.dialogService.closeMatDialog("shortcuts");
                } else {
                    this.dialogService.openMatDialog("shortcuts");
                }
            });
        });

        mousetrap.bind("ctrl+alt+s", () => {
            this.ngZone.run(() => {
                if (this.dialogService.getMatDialogStatus("settings")) {
                    this.dialogService.closeMatDialog("settings");
                } else {
                    this.dialogService.openMatDialog("settings");
                }
            });
        });

     
    }

}

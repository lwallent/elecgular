import { Component, OnInit } from '@angular/core';
import { ToolbarContributionService, IAction } from '../toolbar/toolbar.service';

@Component({
    selector: 'app-shortcuts',
    template: `<div class="shortcuts">
                    <button class="close-dialog" color="primary" mat-dialog-close mat-icon-button>
                        <mat-icon aria-label="Example icon-button with a heart icon">close</mat-icon>
                    </button>

                    <h2 mat-dialog-title>{{ "SHORTCUTS_TITLE" | translate }}</h2>

                    <mat-dialog-content>
                        <table>
                            <tr>
                                <td><span>Esc</span></td>
                                <td>{{ "TOOLTIPS.ESC" | translate }}</td>
                                <td><span>Shift</span> + <span>?</span></td>
                                <td>{{ "TOOLTIPS.SHORTCUTS" | translate }}</td>
                            </tr>
                            <tr *ngFor="let action of contributed | pairs" >
                                <td><span>{{action[0].shortcut}}</span></td>
                                <td>{{ action[0].displayKey | translate }}</td>
                                <td *ngIf="action[1]"><span>{{action[1].shortcut}}</span></td>
                                <td *ngIf="action[1]">{{ action[1].displayKey | translate }}</td>
                            </tr>
                        </table>
                    </mat-dialog-content>
                </div>`,
    styleUrls: ['./shortcuts.component.scss'],
})
export class ShortcutsComponent implements OnInit {

    private contributed: IAction[] = [];

    constructor(  private toolbarContributions: ToolbarContributionService) {

    }

    public ngOnInit(): void {
        this.toolbarContributions.contributions.subscribe((res) => {
            const actions  = res.reduce<IAction[]>((reduction, contr) => {
                return reduction.concat(contr.actions);
            }, []);
            this.contributed = actions.filter((action) => !!action.shortcut);
        });
    }
}

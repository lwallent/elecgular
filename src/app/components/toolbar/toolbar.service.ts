import { Injectable } from '@angular/core';
import {List} from 'immutable';
import { BehaviorSubject } from 'rxjs';

// Make one common action interface ?

export interface IAction {

    displayName?: string;
    displayKey?: string;
    disabled?: boolean;
    iconName: string;
    shortcut?: string;
    route?: string;

    action?: () => void;
}

export interface IActionContribution {
    providerId: string;
    actions: IAction[];
}

@Injectable()
export class ToolbarContributionService {
    private toolbarItems: IAction[] = [];
    private contributionsSubject: BehaviorSubject<List<IActionContribution>> = new BehaviorSubject(List([]));

    get contributions() {
        return this.contributionsSubject.asObservable();
    }

    public getToolbarItems(): IAction[] {
        return this.toolbarItems;
    }
    public add(contribution: IActionContribution) {
        this.contributionsSubject.next(this.contributionsSubject.getValue().push(contribution));
    }

    public remove(providerId: string) {
        const neu = this.contributionsSubject.getValue().filter((contribution) => contribution.providerId !== providerId);
        this.contributionsSubject.next(neu);
    }

}

import { Injectable } from '@angular/core';
import { IMenuContribution } from './menu-contribution';

@Injectable()
export class SideMenuContributionService {
    private menuItems: IMenuContribution[] = [];

    public getMenuItems(): IMenuContribution[] {
        return this.menuItems;
    }
    public add(items: IMenuContribution[]) {
        this.menuItems.push(...items);
    }
}

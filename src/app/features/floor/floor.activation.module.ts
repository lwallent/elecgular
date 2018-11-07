import { APP_INITIALIZER, NgModule } from '@angular/core';
import { IMenuContribution } from '../../components/sidenav/menu-contribution';
import { SideMenuContributionService } from '../../components/sidenav/side-menu.contribution.service';

// user-defined module
export function someAppInitializer(menu: SideMenuContributionService) {
    return () => {

      const iconItems: IMenuContribution[] = [
        {
            displayName: 'Floor View',
            iconName: 'grid_on',
            route: '/floor',
        },
    ];

      menu.add(iconItems);
    };
  }

@NgModule({
    // imports: [],
    providers: [{
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: someAppInitializer,
        deps: [SideMenuContributionService],
      }],
})
export class FloorActivationModule {

}

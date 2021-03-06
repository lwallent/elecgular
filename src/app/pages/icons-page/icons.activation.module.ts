import { APP_INITIALIZER, NgModule } from '@angular/core';
import { IMenuContribution } from '../../components/sidenav/menu-contribution';
import { SideMenuContributionService } from '../../components/sidenav/side-menu.contribution.service';

// user-defined module
export function someAppInitializer(menu: SideMenuContributionService) {
    return () => {

      const iconItems: IMenuContribution[] = [
        {
            displayName: 'MAT Icon',
            iconName: 'filter_1',
            route: '/icons/mat',
        },
        {
            displayName: 'FA Icons',
            iconName: 'filter_2',
            route: '/icons/fa',
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
export class IconsActivationModule {

}

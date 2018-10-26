import {Component, Input} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {DialogService} from '../../services/dialog.service';
import {UtilsService} from '../../services/utils.service';
import { IMenuContribution } from './menu-contribution';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
    public isExpanded = false;
    @Input() public sidenav: MatSidenav;

    public platform: string;

    // Contributions hardcoded for now
    public navItems: IMenuContribution[] = [
        {
          displayName: 'DevFestFL',
          iconName: 'recent_actors',
          children: [
            {
              displayName: 'Speakers',
              iconName: 'group',
              children: [
                {
                  displayName: 'Michael Prentice',
                  iconName: 'person',
                  route: 'michael-prentice',
                  children: [
                    {
                      displayName: 'Create Enterprise UIs',
                      iconName: 'star_rate',
                      route: 'material-design',
                    },
                  ],
                },
                {
                  displayName: 'Stephen Fluin',
                  iconName: 'person',
                  route: 'stephen-fluin',
                  children: [
                    {
                      displayName: 'What\'s up with the Web?',
                      iconName: 'star_rate',
                      route: 'what-up-web',
                    },
                  ],
                },
                {
                  displayName: 'Mike Brocchi',
                  iconName: 'person',
                  route: 'mike-brocchi',
                  children: [
                    {
                      displayName: 'My ally, the CLI',
                      iconName: 'star_rate',
                      route: 'my-ally-cli',
                    },
                    {
                      displayName: 'Become an Angular Tailor',
                      iconName: 'star_rate',
                      route: 'become-angular-tailer',
                    },
                  ],
                },
              ],
            },
            {
              displayName: 'Sessions',
              iconName: 'speaker_notes',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'material-design',
                },
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'what-up-web',
                },
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'my-ally-cli',
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'become-angular-tailer',
                },
              ],
            },
            {
              displayName: 'Feedback',
              iconName: 'feedback',
              route: 'feedback',
            },
          ],
        },
        {
          displayName: 'Disney',
          iconName: 'videocam',
          children: [
            {
              displayName: 'Speakers',
              iconName: 'group',
              children: [
                {
                  displayName: 'Michael Prentice',
                  iconName: 'person',
                  route: 'michael-prentice',
                  children: [
                    {
                      displayName: 'Create Enterprise UIs',
                      iconName: 'star_rate',
                      route: 'material-design',
                    },
                  ],
                },
                {
                  displayName: 'Stephen Fluin',
                  iconName: 'person',
                  route: 'stephen-fluin',
                  children: [
                    {
                      displayName: 'What\'s up with the Web?',
                      iconName: 'star_rate',
                      route: 'what-up-web',
                    },
                  ],
                },
                {
                  displayName: 'Mike Brocchi',
                  iconName: 'person',
                  route: 'mike-brocchi',
                  children: [
                    {
                      displayName: 'My ally, the CLI',
                      iconName: 'star_rate',
                      route: 'my-ally-cli',
                    },
                    {
                      displayName: 'Become an Angular Tailor',
                      iconName: 'star_rate',
                      route: 'become-angular-tailer',
                    },
                  ],
                },
              ],
            },
            {
              displayName: 'Sessions',
              iconName: 'speaker_notes',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'material-design',
                },
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'what-up-web',
                },
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'my-ally-cli',
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'become-angular-tailer',
                },
              ],
            },
            {
              displayName: 'Feedback',
              iconName: 'feedback',
              route: 'feedback',
            },
          ],
        },
        {
          displayName: 'Orlando',
          iconName: 'movie_filter',
          children: [
            {
              displayName: 'Speakers',
              iconName: 'group',
              children: [
                {
                  displayName: 'Michael Prentice',
                  iconName: 'person',
                  route: 'michael-prentice',
                  children: [
                    {
                      displayName: 'Create Enterprise UIs',
                      iconName: 'star_rate',
                      route: 'material-design',
                    },
                  ],
                },
                {
                  displayName: 'Stephen Fluin',
                  iconName: 'person',
                  route: 'stephen-fluin',
                  children: [
                    {
                      displayName: 'What\'s up with the Web?',
                      iconName: 'star_rate',
                      route: 'what-up-web',
                    },
                  ],
                },
                {
                  displayName: 'Mike Brocchi',
                  iconName: 'person',
                  route: 'mike-brocchi',
                  children: [
                    {
                      displayName: 'My ally, the CLI',
                      iconName: 'star_rate',
                      route: 'my-ally-cli',
                    },
                    {
                      displayName: 'Become an Angular Tailor',
                      iconName: 'star_rate',
                      route: 'become-angular-tailer',
                    },
                  ],
                },
              ],
            },
            {
              displayName: 'Sessions',
              iconName: 'speaker_notes',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'material-design',
                },
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'what-up-web',
                },
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'my-ally-cli',
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'become-angular-tailer',
                },
              ],
            },
            {
              displayName: 'Feedback',
              iconName: 'feedback',
              route: 'feedback',
            },
          ],
        },
        {
          displayName: 'Maleficent',
          disabled: true,
          iconName: 'report_problem',
          children: [
            {
              displayName: 'Speakers',
              iconName: 'group',
              children: [
                {
                  displayName: 'Michael Prentice',
                  iconName: 'person',
                  route: 'michael-prentice',
                  children: [
                    {
                      displayName: 'Create Enterprise UIs',
                      iconName: 'star_rate',
                      route: 'material-design',
                    },
                  ],
                },
                {
                  displayName: 'Stephen Fluin',
                  iconName: 'person',
                  route: 'stephen-fluin',
                  children: [
                    {
                      displayName: 'What\'s up with the Web?',
                      iconName: 'star_rate',
                      route: 'what-up-web',
                    },
                  ],
                },
                {
                  displayName: 'Mike Brocchi',
                  iconName: 'person',
                  route: 'mike-brocchi',
                  children: [
                    {
                      displayName: 'My ally, the CLI',
                      iconName: 'star_rate',
                      route: 'my-ally-cli',
                    },
                    {
                      displayName: 'Become an Angular Tailor',
                      iconName: 'star_rate',
                      route: 'become-angular-tailer',
                    },
                  ],
                },
              ],
            },
            {
              displayName: 'Sessions',
              iconName: 'speaker_notes',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'material-design',
                },
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'what-up-web',
                },
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'my-ally-cli',
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'become-angular-tailer',
                },
              ],
            },
            {
              displayName: 'Feedback',
              iconName: 'feedback',
              route: 'feedback',
            },
          ],
        },
      ];

    constructor(public dialogService: DialogService,
                public utilsService: UtilsService) {
        this.platform = window.process.platform;
    }

    public toggleExpanded() {
        this.isExpanded = !this.isExpanded;
    }
}

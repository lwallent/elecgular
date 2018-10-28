import {Component, Input} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {DialogService} from '../../services/dialog.service';
import {UtilsService} from '../../services/utils.service';
import { IMenuContribution } from './menu-contribution';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    animations: [
        trigger('arrowRotate', [
            state('backward', style({transform: 'rotate(0deg)'})),
            state('forward', style({transform: 'rotate(180deg)'})),
            transition('backward <=> forward',
                animate('225ms cubic-bezier(0.4,0.0,0.2,1)'),
            ),
        ]),
    ],
})
export class SidenavComponent {
    public isExpanded = false;
    public expandLayout = 'column';
    @Input() public sidenav: MatSidenav;

    public platform: string;

    public iconItems: IMenuContribution[] = [
        {
            displayName: 'Glyph Icons',
            iconName: 'A',
            route: '/icons/glyph',
        },
        {
            displayName: 'MAT Icon',
            iconName: 'B',
            route: '/icons/mat',
        },
        {
            displayName: 'FA Icons',
            iconName: 'insert_emoticon',
            route: '/icons/fa',
        },
    ];

    public navBasicItems: IMenuContribution[] = [
        {
            displayKey: 'SHORTCUTS_TITLE',
            iconName: 'timeline',
            action: () => this.dialogService.openMatDialog('shortcuts'),
        },
        {
            displayKey: 'ABOUT_TITLE',
            iconName: 'info',
            action: () => this.dialogService.openMatDialog('about'),
        },
    ];

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
        this.expandLayout = this.isExpanded ? 'row' : 'column';
    }
}

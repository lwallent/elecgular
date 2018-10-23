import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../services/utils.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {

    public packageInformations: any;
    public currentYear: string;

    constructor(public utilsService: UtilsService) {
    }

    public ngOnInit() {
        this.utilsService.getPackageInformations().then((packageInformations: any) => {
            this.packageInformations = packageInformations;
        });

        this.currentYear = new Date().getFullYear().toString();
    }

    public openLink(event: MouseEvent) {
        event.preventDefault();

        this.utilsService.openExternalLink(event.srcElement.innerHTML);
    }

}

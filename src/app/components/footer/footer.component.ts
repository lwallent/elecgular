import {Component, OnInit} from "@angular/core";
import {NotificationsService} from "../../services/notifications.service";

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {

    public informations: string;

    public fileSaved: boolean;
    public filePath: string;

    constructor(public notificationsService: NotificationsService) {
    }

    ngOnInit() {
        this.notificationsService.watchInfoStatus().subscribe((informations: string) => {
            this.informations = informations;
        });
    }

}

import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html'
})
export class AppFooterComponent {

    dockItems: MenuItem[] =[];

    constructor(public layoutService: LayoutService) {

        this.dockItems = [
            {
                label: 'Finder',
                icon: "assets/showcase/images/dock/finder.svg"
            },
            {
                label: 'App Store',
                icon: "assets/showcase/images/dock/appstore.svg"
            },
            {
                label: 'Photos',
                icon: "assets/showcase/images/dock/photos.svg"
            },
            {
                label: 'Trash',
                icon: "assets/showcase/images/dock/trash.png"
            }
        ];
     }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { GlobalDataService } from '../core/services/global-data.service';
import { LayoutService } from "./service/app.layout.service";
//import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    //page_name_bs = new BehaviorSubject("");
    pageName = ""

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private globalDataService: GlobalDataService) {
    }
    ngOnInit() {
        this.globalDataService.getPageName().subscribe((param: any) => {
            this.pageName = param;
        });
    }
}

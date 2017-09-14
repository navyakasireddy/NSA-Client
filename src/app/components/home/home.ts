import { Component, ViewEncapsulation, ViewChild, OnInit, NgModule, ElementRef } from '@angular/core';

import { AboutPage } from "../about/about";

import { AppService } from "../../services/app.service";
import { LoginService } from "../../services/login.service";
import { AdminDataService } from "../../services/adminData.service";
import { AppModule } from "../../app.module";

import { MdSidenav, MdSidenavModule } from '@angular/material';
import { Router, RouterModule } from '@angular/router';

const SMALL_WIDTH_BREAKPOINT = 840;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',

})
export class HomePage {
    
    //@ViewChild('aaa') tree: ElementRef;
    public nodes: any;/*= [
    {
      "id": "1",
      "name": 'root1',
      "children": [
        { "id": "2", "name": 'child1' },
        { "id": "3", "name": 'child2' }
      ]
    },
    {
      "id": "4",
      "name": 'root2',
      "children": [
        { "id": "5", "name": 'child2.1' },
        {
          "id": "6",
          "name": 'child2.2',
          "children": [
            { "id": "7", "name": 'subsub' }
          ]
        }
      ]
    }
  ];*/






    constructor(private _adminDataService: AdminDataService, private _router: Router, private loginService: LoginService, private elRef: ElementRef) { }
    @ViewChild(MdSidenav) sidenav: MdSidenav;



    isScreenSmall(): boolean {
        return window.matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`).matches;
    }


    check() {
        var tree = this.elRef.nativeElement.querySelector('#tree');
             tree.treeModel.getNodeByName("Plug-ins")
             .setActiveAndVisible();
    }

    ngOnInit() {
        this._router.events.subscribe(() => {
            if (this.isScreenSmall()) {
                this.sidenav.close();
            }
        });
     
       

        this._adminDataService.getAdminListDetails().then((res: any) => {
            this.nodes = res;           
            var tree = this.elRef.nativeElement.querySelector('#tree');
        }, (error) => {
        });
    }

    ngAfterViewInit() {
        
    }

    onEvent($event) {
        var n, p;
        if ($event.eventName == "initialized") {           
            $event.treeModel.getNodeBy((node) => node.data.id === '4.9')
                .setActiveAndVisible();
        }
        if ($event.treeModel != undefined && $event.treeModel.activeNodes[0] != undefined ){ //&& $event.treeModel.activeNodes[0].children.length == 0) {
            if ($event.treeModel.activeNodes[0].parent.data.name === "Media") {
                n = "Media";
                p = "Documents";
                this._router.navigate([p, n, $event.treeModel.activeNodes[0].data.name]);//, { queryParams: { mediaType: $event.treeModel.activeNodes[0].data.name } });
            }
            else if ($event.treeModel.activeNodes[0].data.name != "Media") {
                n = $event.treeModel.activeNodes[0].data.name;
                p = $event.treeModel.activeNodes[0].parent.data.name;
                this._router.navigate([p + '/' + n]);
            }
           
        }
        //else if ($event.treeModel != undefined && $event.treeModel.activeNodes[0] != undefined && $event.treeModel.activeNodes[0].children.length > 0) {
        //    debugger;
        //    var childList = $event.treeModel.nodes[0].children;
        //}
    }
}

import {Component, ViewEncapsulation, ViewChild, OnInit, NgModule} from '@angular/core';

import {AboutPage} from "../about/about";

import {AppService} from "../../services/app.service";
import {LoginService} from "../../services/login.service";
import {AdminDataService} from "../../services/adminData.service";
import {AppModule} from "../../app.module";

import {MdSidenav, MdSidenavModule} from '@angular/material';
import {Router, RouterModule} from '@angular/router';

const SMALL_WIDTH_BREAKPOINT = 840;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {
 public nodes: any= [
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
  ];



   


constructor(private _adminDataService: AdminDataService , private _router: Router) {}  
	  @ViewChild(MdSidenav) sidenav: MdSidenav;

	    ngOnInit() {
    this._router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
  }

  isScreenSmall(): boolean {
    return window.matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`).matches;
  }


 // ngOnInit() { 
  
  
           
       // this._adminDataService.getAdminListDetails().then((res:any) => {  
       //  this.nodes =res;  }, (error) => {  
       // });  
   //  } 
	/* onEvent($event){
	 	 if($event.node != undefined && $event.node.children.length==0)
		 {
		 
		 }
	 }*/
}

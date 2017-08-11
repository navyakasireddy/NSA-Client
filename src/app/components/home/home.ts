import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AboutPage} from "../about/about";

import {AppService} from "../../services/app.service";
import {LoginService} from "../../services/login.service";
import {AdminDataService} from "../../services/adminData.service";
import {AppModule} from "../../app.module";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {
 public nodes: any;
constructor(private _adminDataService: AdminDataService) {          
    }  

  ngOnInit() {          
        // this._adminDataService.getAdminListDetails().then((res:any) => {  
         this.nodes =  [
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
        // }, (error) => {  
             
       // });  
     } 
	 
	 
	/*   nodes = [
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
  
}

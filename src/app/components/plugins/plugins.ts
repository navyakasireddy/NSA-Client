import { Component } from '@angular/core';
import {GetDataService} from "../../services/getData.service";
@Component({
  selector: 'page-plugins',
  templateUrl: 'plugins.html'
})
export class Plugins {
public pluginData:any;
  constructor(private _dataService:GetDataService) {} 
 

   ngOnInit() { 
//this._dataService.getList("plugins").then((res:any) => {  
     debugger;
	   this.pluginData   = {
    "pluginList": [
        {
            "pluginId": null,
            "name": "NAS1",
            "type": "DLL",
            "module": "pgennas.dll"
        },
        {
            "pluginId": null,
            "name": "NAS2",
            "type": "DLL",
            "module": "pgennas.dll"
        }
    ],
    "responseMsg": "Displaying All Plugins",
    "pluginExists": true
} 
//res;  
	  // }, (error) => {  
      // });  
  } 


}

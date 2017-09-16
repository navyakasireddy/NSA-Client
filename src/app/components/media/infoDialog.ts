import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { PluginDataService } from "../../services/pluginData.service";
import { DocMediaService } from "../../services/documentMedia.service";
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'dialog-info',
    templateUrl: 'infoDialog.html'

})
export class InfoDialog {
    
    public mediaItem: any;
   

    

    constructor( @Inject(MD_DIALOG_DATA) public data: any, private _mediaService: DocMediaService,
       private route: ActivatedRoute) { }


    ngOnInit() {
        
    
        this.mediaItem = this.data;
        console.log(this.mediaItem);
        debugger;
        //this._pluginService.getList().then((res: any) => {
        //    if (res.pluginList.length > 0) {
        //        this.plugins = res.pluginList;
        //        console.log(this.plugins);
        //    }
        //});
    }
    updateValue(actionItem) {
            this._mediaService.update(actionItem).then((res: any) => {                                
            }, (error) => {
            });        
    }    
}



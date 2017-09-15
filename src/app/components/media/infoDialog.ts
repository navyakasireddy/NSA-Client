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
   

    plugins = [
    ];

    constructor( @Inject(MD_DIALOG_DATA) public data: any, private _pluginService: PluginDataService, private _mediaService: DocMediaService,
       private route: ActivatedRoute) { }


    ngOnInit() {
        //alert(typeof (this.data));
        //this.action = typeof (this.data) == "string" ?"Create" : "Update";
        //this.mediaItem = typeof (this.data) != "string" ? this.data : {
        //    mediumDesc: "",
        //    storageCapacity: "",
        //    pluginValue: "",
        //    isContainer: false,
        //    isNamedPool: false,
        //    maxNumber: "",
        //    maxSize: "",
        //    timeOut: "",
        //    mediaType: this.data
        //};
        //this._pluginService.getList().then((res: any) => {
        //    if (res.pluginList.length > 0) {
        //        this.plugins = res.pluginList;
        //        console.log(this.plugins);
        //    }
        //});
    }

    
}



import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { PluginDataService } from "../../services/pluginData.service";
import { DocMediaService } from "../../services/documentMedia.service";
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'dialog-media',
    templateUrl: 'mediaDialog.html'

})
export class MediaDialog {
    private errorMessage: string;
    public action: string;
    public mediaItem: any;
    mediaType: string = "";
   
    plugins = [
    ];

    constructor( @Inject(MD_DIALOG_DATA) public data: any, private _pluginService: PluginDataService, private _mediaService: DocMediaService,
        private dialogRef: MdDialogRef<MediaDialog>,private route: ActivatedRoute) { }


    ngOnInit() { 
       
        this.action = this.data == null ? "Create" : "Update";
        this.mediaItem = this.data != null ? this.data : {
            mediumDesc: "",
            storageCapacity: "",
            pluginValue: "",
            isContainer: false,
            isNamedPool: false,
            maxNumber: "",
            maxSize: "",
            timeOut: "",
            
        };
        this._pluginService.getList("plugins").then((res: any) => {
            if (res.pluginList.length > 0) {
                this.plugins = res.pluginList;
                console.log(this.plugins);
            }
        });
        var mediatype = this.route.snapshot.queryParams['mediaType'];
        switch (mediatype) {
            case "Removable media": this.mediaItem.documentMediaType = "REMOVABLE_MEDIA"; break;
            case "Migrated media": this.mediaItem.documentMediaType = "MIGRATED_MEDIA"; break;
            case "Buffer media": this.mediaItem.documentMediaType = "BUFFER_MEDIA"; break;
            case "Imported media": this.mediaItem.documentMediaType = "IMPORTED_MEDIA"; break;
            case "Closed media": this.mediaItem.documentMediaType = " CLOSED_MEDIA"; break;
            case "All media": this.mediaItem.documentMediaType = "ALL_MEDIA"; break;
            default: this.mediaItem.documentMediaType = "REMOVABLE_MEDIA"; break;
        }
    }

    ApplyAction(actionItem) {
        if (this.action == "Create") {
            this._mediaService.create(actionItem).then((res: any) => {                
                this.dialogRef.close(res.responseMsg);
            }, (error) => {
            });
        }
        else if (this.action == "Update") {
            this._mediaService.update(actionItem).then((res: any) => {
                console.log(res)
                this.dialogRef.close(res.responseMsg);
            }, (error) => {
            });
        }
    }
}



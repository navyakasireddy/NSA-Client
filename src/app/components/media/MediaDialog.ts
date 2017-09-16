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
        private dialogRef: MdDialogRef<MediaDialog>, private route: ActivatedRoute) { }


    ngOnInit() {
        this.action = typeof (this.data) == "string" ? "Create" : "Update";
        this._pluginService.getList().then((res: any) => {
            if (res.pluginList.length > 0) {
                this.plugins = res.pluginList;
                console.log(this.plugins);
            }
        })
            
            
        this.mediaItem = typeof (this.data) != "string" ? this.data : {
            "documentMediaType": this.data,
            "id": "",
            "name": "",
            "type": "",
            "location": "",
            "generatedOn": "",
            "storageUsed": "",
            "freeStorage": "",
            "storageCapacity": "",
            "objectCount": "",
            "unitSize": "",
            "cacheObjects": "",
            "mediumObjects": "",
            "usage": "",
            "retentionTime": "",
            "life": "",
            "retentionPlace": "",
            "plugin": {
                "pluginId": "",
                "name": "",
                "type": "",
                "module": "",
                "status": ""
            },
            "maxNoOfObjects": "",
            "maximumSize": "",
            "timeOut": "",
            "openTransactions": "",
            "transactionData": "",
            "container": "",
            "dataHashActive": "",
            "namedPool": ""
        }

    
    }

    ngAfterViewInit() {
        // ...
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



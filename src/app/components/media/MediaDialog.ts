import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { PluginDataService } from "../../services/pluginData.service";
import { DocMediaService } from "../../services/documentMedia.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Logger } from "angular2-logger/core";

@Component({
    selector: 'dialog-media',
    templateUrl: 'mediaDialog.html'

})
export class MediaDialog {
    private errorMessage: string;
    public action: string;
    public mediaType: string;
    public mediaItem: any;
   

    plugins = [
    ];

    constructor( @Inject(MD_DIALOG_DATA) public data: any, private _pluginService: PluginDataService, private _mediaService: DocMediaService, private _logger: Logger,
        private dialogRef: MdDialogRef<MediaDialog>, private route: ActivatedRoute) {
        this._logger.info('form : Media Dialog.ts' );
    }


    ngOnInit() {
        this.action = typeof (this.data) == "string" ? "Create" : "Update";
        
        this._pluginService.getList().then((res: any) => {
            if (res.pluginList.length > 0) {
                this.plugins = res.pluginList;
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
            "storageCapacity": "1024",
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
            "maxNoOfObjects": "1024",
            "maximumSize": "100",
            "timeOut": "1440",
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
                this._logger.error('Error : ' + error);
            });
        }
        else if (this.action == "Update") {
            this._mediaService.update(actionItem).then((res: any) => {
                console.log(res)
                this.dialogRef.close(res.responseMsg);
            }, (error) => {
                this._logger.error('Error : ' + error);
            });
        }
    }
}



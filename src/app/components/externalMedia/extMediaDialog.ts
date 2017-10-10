import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { PluginDataService } from "../../services/pluginData.service";
import { DocMediaService } from "../../services/documentMedia.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Logger } from "angular2-logger/core";

@Component({
    selector: 'dialog-extmedia',
    templateUrl: 'extMediaDialog.html'

})
export class ExtMediaDialog {
    public action: string;
    public mediaItem: any;
    public mediaStorageKinds: any = [{value: 'Amazon S3' },
        { value: 'Azure' },
        { value: 'SAS' }];

    constructor( @Inject(MD_DIALOG_DATA) public data: any,
        private dialogRef: MdDialogRef<ExtMediaDialog>,private _mediaService: DocMediaService, private _logger: Logger
    ) {
        this._logger.info('Page : extMediaDialog.ts');
        
    }
    


    ngOnInit() {
        this.action = this.data == null ? "Create" : "Update";

        this.mediaItem = this.data != null ? this.data : {
            mediaName: "",
            mediaStorageKind: "",
            url: "",
            token: ""
        };
    }

    ApplyAction(actionItem) {
        if (this.action == "Create") {
            debugger;
            this._mediaService.createCloudmedia(actionItem).then((res: any) => {
                this.dialogRef.close(res.responseMsg);
            }, (error) => {
                this._logger.error('Error : ' + error);
            });
        }
        else if (this.action == "Update") {
            this._mediaService.updateCloudmedia(actionItem).then((res: any) => {
                console.log(res)
                this.dialogRef.close(res.responseMsg);
            }, (error) => {
                this._logger.error('Error : ' + error);
            });
        }
    }
    
}



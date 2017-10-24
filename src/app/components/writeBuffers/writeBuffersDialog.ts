import { Component, OnInit, Inject } from '@angular/core';
import { Logger } from "angular2-logger/core";
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { MediaPoolsService } from "../../services/mediapools.service";
import { DocMediaService } from "../../services/documentMedia.service";
@Component({
    selector: 'dialog-writeBuffersDialog',
    templateUrl: 'writeBuffersDialog.html'

})
export class WriteBuffersDialog {
    public writeBufferItem: any;
    public action: string;
    public serverPools: any = [];
    public mode: any = [
        { value: 'Write back' },
        { value: 'Write through' }
    ];
    public write: any = [
        { value: 'Write immediate' },
         { value: 'Schedule writes by task' }
        //{ value: 'GB' },
        //{ value: 'TB' }
    ];
    public verify: any = [
        { value: 'Off (not recommended)' },
        { value: 'Full (Reload Medium)' },
        { value: 'Fast (no reload)' }
        //{ value: 'GB' },
        //{ value: 'TB' }
    ];

    public allMedia: any = [];

    constructor( @Inject(MD_DIALOG_DATA) public data: any, private _logger: Logger, private dialogRef: MdDialogRef<WriteBuffersDialog>,
        private _dataService: MediaPoolsService, private _mediaService: DocMediaService
    ) {
        this._logger.info('form : globalpool Dialog.ts');
    }

    ngOnInit() {
        this.action = this.data == null ? "Create" : "Update";

        this._mediaService.getList("").then((res: any) => {
            if (res.mediaList.length > 0) {
                debugger;
                this.allMedia = res.mediaList;
            }
        });

        

        this.writeBufferItem = this.data != null ? this.data : {
            name: "",
            data: "",
            table: "",
            mode: "Write back",
            write: "Write immediate",
            verify:"Full (Reload Medium)",
            maxSize: 1024,
            minFree: 5,
            mediaList:[]
        };
    }

    ApplyAction(actionItem) {
        if (this.action == "Create") {
            this._dataService.create(actionItem,"GP").then((res: any) => {
                this.dialogRef.close(res.responseMsg);
            }, (error) => {
                this._logger.error('Error : ' + error);
            });
        }
        else if (this.action == "Update") {
            this._dataService.update(actionItem,"GP").then((res: any) => {
                console.log(res)
                this.dialogRef.close(res.responseMsg);
            }, (error) => {
                this._logger.error('Error : ' + error);
            });
        }
    }
}



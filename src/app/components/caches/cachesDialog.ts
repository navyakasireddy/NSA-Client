import { Component, OnInit, Inject } from '@angular/core';
import { Logger } from "angular2-logger/core";
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { MediaPoolsService } from "../../services/mediapools.service";

@Component({
    selector: 'dialog-caches',
    templateUrl: 'cachesDialog.html'

})
export class CachesDialog {
    public cachesItem: any;
    public action: string;
    public serverPools: any = [];
    public clients: any = [
        //{ value: 'non-client-specific' },
        //{ value: 'system' }
        //{ value: 'GB' },
        //{ value: 'TB' }
    ];
    public profiles: any = [
        { value: 'standard profile' },
         { value: 'no encryption' }
        //{ value: 'GB' },
        //{ value: 'TB' }
    ];

    constructor( @Inject(MD_DIALOG_DATA) public data: any, private _logger: Logger, private dialogRef: MdDialogRef<CachesDialog>,
        private _dataService: MediaPoolsService
    ) {
        this._logger.info('form : globalpool Dialog.ts');
    }

    ngOnInit() {
        this.action = this.data == null ? "Create" : "Update";

        this._dataService.getList("SP").then((res: any) => {
            if (res.serverPoolList.length > 0) {
                this.serverPools = res.serverPoolList;
            }
        });

        

        this.cachesItem = this.data != null ? this.data : {
            name: "",
            data: "",
            table: "",
            Mode: "",
            maxSize: 1024,
            minFree:5
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



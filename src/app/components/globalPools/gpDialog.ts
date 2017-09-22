import { Component, OnInit, Inject } from '@angular/core';
import { Logger } from "angular2-logger/core";
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { MediaPoolsService } from "../../services/mediapools.service";

@Component({
    selector: 'dialog-globalpool',
    templateUrl: 'gpDialog.html'

})
export class GlobalPoolDialog {
    public GlobalPoolItem: any;
    public action: string;
    public mediaTypes: any = [];

    constructor( @Inject(MD_DIALOG_DATA) public data: any, private _logger: Logger, private dialogRef: MdDialogRef<GlobalPoolDialog>,
        private _dataService: MediaPoolsService
    ) {
        this._logger.info('form : globalpool Dialog.ts');
    }

    ngOnInit() {
        this.action = this.data == null ? "Create" : "Update";

        //this._dataService.getList("").then((res: any) => {
        //    if (res.mediaList.length > 0) {
        //        this.mediaTypes = res.mediaList;
        //    }
        //});

        this.GlobalPoolItem = this.data != null ? this.data : {
            name: "",
            serverPool: [],
            srsProfile: "",
            condition: "",
            client: "",
            profile:""
        };
    }

    ApplyAction(actionItem) {
        if (this.action == "Create") {
            this._dataService.create(actionItem).then((res: any) => {
                this.dialogRef.close(res.responseMsg);
            }, (error) => {
                this._logger.error('Error : ' + error);
            });
        }
        else if (this.action == "Update") {
            this._dataService.update(actionItem).then((res: any) => {
                console.log(res)
                this.dialogRef.close(res.responseMsg);
            }, (error) => {
                this._logger.error('Error : ' + error);
            });
        }
    }
}



import { Component, ViewEncapsulation, ViewChild, OnInit, NgModule, ElementRef } from '@angular/core';
import { Logger } from "angular2-logger/core";
import { DeleteDialog } from '../common/deleteDialog';
import { MdDialog, MdDialogRef, MdCard, MdSort, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { GlobalPoolDialog } from './gpDialog';
import { MediaPoolsService } from "../../services/mediapools.service";

@Component({
    selector: 'page-globalpool',
    templateUrl: 'globalPools.html',

})
export class GlobalPools {
    dialogRef: MdDialogRef<GlobalPoolDialog>;
    dialogRefDel: MdDialogRef<DeleteDialog>;
    constructor(private _logger: Logger
        , public dialog: MdDialog, public snackBar: MdSnackBar, private _dataService: MediaPoolsService
    ) {
        this._logger.info('form : globalpool.ts');
    }
    GetData() {

    }

    onApplyAction(action: string, item) {
        if (action == 'update') {
            this.dialogRef = this.dialog.open(GlobalPoolDialog, {
                disableClose: true,
                data: item
            });

            this.dialogRef.afterClosed().subscribe(result => {
                console.log('result: ' + result);
                this.dialogRef = null;
                this.GetData();
                if (result != "")
                    this.openSnackBar(result, "");
            });
        }
        else if (action == 'delete') {
            this.dialogRefDel = this.dialog.open(DeleteDialog, {
                disableClose: true
            });


            this.dialogRefDel.afterClosed().subscribe(result => {
                if (result) {
                    this._dataService.Delete(item.pluginId).then((res: any) => {
                        console.log(res);
                        if (result != "")
                            this.openSnackBar(res.responseMsg, "");
                        this.GetData();
                        this.dialogRef = null;
                    }, (error) => {
                        this._logger.error('Error : ' + error);
                    });
                }


            });

        }
        else {
            this.dialogRef = this.dialog.open(GlobalPoolDialog, {
                disableClose: true
            });

            this.dialogRef.afterClosed().subscribe(result => {
                console.log('result: ' + result);
                this.dialogRef = null;
                if (result != "")
                    this.openSnackBar(result, "");
                this.GetData();
            });
        }
    }

    openSnackBar(message: string, action: string) {
        if (message != "") {
            let config = new MdSnackBarConfig();
            config.duration = 1600;
            config.extraClasses = ["position"];
            this.snackBar.open(message, action, config);
        }
    }
}

import { Component } from '@angular/core';
import { ModalDialog } from './modalDialog';
import { MdDialog, MdDialogRef } from '@angular/material';
import { GetDataService } from "../../services/getData.service";


@Component({
    selector: 'page-plugins',
    templateUrl: 'plugins.html'
})
export class Plugins {
    pluginData: any = {};
    dialogRef: MdDialogRef<ModalDialog>;
    constructor(private _dataService: GetDataService, public dialog: MdDialog) {}


    ngOnInit() {
        this.GetData();
    }

    GetData() {
        this._dataService.getList("plugins").then((res: any) => {
            this.pluginData = res;
        }, (error) => {
        });
    }

    onApplyAction(action: string, item) {        
        if (action == 'update') {
            this.dialogRef = this.dialog.open(ModalDialog, {
                disableClose: true,
                data: item
            });

            this.dialogRef.afterClosed().subscribe(result => {
                console.log('result: ' + result);
                this.dialogRef = null;
                this.GetData();
            });  
        }
        else if (action == 'delete') {
            this._dataService.Delete(item.pluginId).then((res: any) => {
                console.log(res)
                this.GetData();
            }, (error) => {
            });
        }
        else {
            this.dialogRef = this.dialog.open(ModalDialog, {
                disableClose: true
            });

            this.dialogRef.afterClosed().subscribe(result => {
                console.log('result: ' + result);
                this.dialogRef = null;
                this.GetData();
            });           
        }
    }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { PluginDataService } from "../../services/pluginData.service";
import { Logger } from "angular2-logger/core";
@Component({
    selector: 'page-dialog',
    templateUrl: 'modalDialog.html'

})
export class ModalDialog {
    private errorMessage: string;
    public action: string;
    public pluginItem: any;

    types = [
        { value: 'DLL', viewValue: 'DLL' },
        { value: 'EVENTSCRIPT', viewValue: 'EVENTSCRIPT' },
        { value: 'JSTORE', viewValue: 'JSTORE' },
        { value: 'COM_OBJECT', viewValue: 'COM_OBJECT' }
    ];


    constructor( @Inject(MD_DIALOG_DATA) public data: any, private _dataService: PluginDataService, private _logger: Logger,
        private dialogRef: MdDialogRef<ModalDialog>) {
        this._logger.info('Page : plugin modalDialog.ts');
    }


    ngOnInit() {       
        this.action = this.data == null ? "Create" : "Update";
        this.pluginItem = this.data != null ? this.data : {
            name: "",
            type: "DLL",
            module: "",
            class:""
        };
    }

    ApplyAction(actionItem) {
        if (this.action == "Create") {
            this._dataService.create(actionItem).then((res: any) => {
                console.log(res)
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



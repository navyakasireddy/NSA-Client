import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { GetDataService } from "../../services/getData.service";
@Component({
    selector: 'page-dialog',
    templateUrl: 'modalDialog.html'

})
export class ModalDialog {
    private errorMessage: string;
    public action: string;
    public pluginItem: any;


    constructor( @Inject(MD_DIALOG_DATA) public data: any, private _dataService: GetDataService,
        private dialogRef: MdDialogRef<ModalDialog>) { }


    ngOnInit() {
        debugger;
        this.action = this.data == null ? "Create" : "Update";
        this.pluginItem = this.data != null ? this.data : {
            name: "",
            type: "",
            module: ""
        };
    }

    ApplyAction(actionItem) {
        if (this.action == "Create") {
            this._dataService.create(actionItem).then((res: any) => {
                console.log(res)
                this.dialogRef.close();
            }, (error) => {
            });
        }
        else if (this.action == "Update") {
            this._dataService.update(actionItem).then((res: any) => {
                console.log(res)
                this.dialogRef.close();
            }, (error) => {
            });
        }
    }
}



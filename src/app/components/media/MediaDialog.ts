import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { PluginDataService } from "../../services/pluginData.service";
@Component({
    selector: 'dialog-media',
    templateUrl: 'mediaDialog.html'

})
export class MediaDialog {
    private errorMessage: string;
    public action: string;
    public pluginItem: any;

   


    constructor( @Inject(MD_DIALOG_DATA) public data: any, private _dataService: PluginDataService,
        private dialogRef: MdDialogRef<MediaDialog>) { }


    ngOnInit() {       
        this.action = this.data == null ? "Create" : "Update";
        this.pluginItem = this.data != null ? this.data : {
            name: "",
            type: "",
            module: ""
        };
    }

    ApplyAction(actionItem) {
        debugger;
        if (this.action == "Create") {
            this._dataService.create(actionItem).then((res: any) => {
                console.log(res)
                this.dialogRef.close(res.responseMsg);
            }, (error) => {
            });
        }
        else if (this.action == "Update") {
            this._dataService.update(actionItem).then((res: any) => {
                console.log(res)
                this.dialogRef.close(res.responseMsg);
            }, (error) => {
            });
        }
    }
}



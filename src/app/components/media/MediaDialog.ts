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
    public mediaItem: any;
    mediaType: string = "";
   
    plugins = [
        { value: 'DLL', viewValue: 'DLL' },
        { value: 'EVENTSCRIPT', viewValue: 'EVENTSCRIPT' },
        { value: 'JSTORE', viewValue: 'JSTORE' },
        { value: 'COM_OBJECT', viewValue: 'COM_OBJECT' }
    ];

    constructor( @Inject(MD_DIALOG_DATA) public data: any, private _dataService: PluginDataService,
        private dialogRef: MdDialogRef<MediaDialog>) { }


    ngOnInit() { 
       
        this.action = this.data == null ? "Create" : "Update";
        this.mediaItem = this.data != null ? this.data : {
            mediumDesc: "",
            storageCapacity: "",
            pluginValue: "",
            isContainer: false,
            isNamedPool: false,
            maxNumber: "",
            maxSize: "",
            timeOut:""
        };
    }

    ApplyAction(actionItem) {
        debugger;
        if (this.action == "Create") {
            //this._dataService.create(actionItem).then((res: any) => {
            //    console.log(res)
            //    this.dialogRef.close(res.responseMsg);
            //}, (error) => {
            //});
        }
        else if (this.action == "Update") {
            //this._dataService.update(actionItem).then((res: any) => {
            //    console.log(res)
            //    this.dialogRef.close(res.responseMsg);
            //}, (error) => {
            //});
        }
    }
}



import { Component, OnInit, Inject } from '@angular/core';
import { Logger } from "angular2-logger/core";
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { CachesDataService } from "../../services/caches.service";
import { DocMediaService } from "../../services/documentMedia.service";

@Component({
    selector: 'dialog-caches',
    templateUrl: 'cachesDialog.html'

})
export class CachesDialog {
    public cachesItem: any;
    public action: string;
    public serverPools: any = [];
    public modes: any = [
        { value: 'Read' },
        { value: 'Compatability' }       
    ];

    public allMedia: any = [];
    

    constructor( @Inject(MD_DIALOG_DATA) public data: any, private _logger: Logger, private dialogRef: MdDialogRef<CachesDialog>,
        private _dataService: CachesDataService,private _mediaService: DocMediaService,
    ) {
        this._logger.info('form : Caches Dialog.ts');
    }

    ngOnInit() {
        this.action = this.data == null ? "Create" : "Update";

        this._mediaService.getList("").then((res: any) => {
            if (res.mediaList.length > 0) {
                debugger;
                this.allMedia = res.mediaList;
            }
        });

        

        this.cachesItem = this.data != null ? this.data : {           
            name: "",
            data: "",
            table: "",
            Mode: "Read",           
            maxSize: 1024,
            minFree: 5,
            mediaList:[]
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



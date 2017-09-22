import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Logger } from "angular2-logger/core";
import { DocMediaService } from "../../services/documentMedia.service";
import { MediaPoolsService } from "../../services/mediapools.service";

@Component({
    selector: 'dialog-serverpool',
    templateUrl: 'spDialog.html'

})
export class ServerPoolDialog { 
    public ServerPoolItem: any;
    public action: string;
    public mediaTypes: any = [];
    public usageTypes: any = [
        { value: 'MB' },
        { value: '%' },
        { value: 'GB' },
        { value: 'TB' }
    ];

    constructor( @Inject(MD_DIALOG_DATA) public data: any, private _logger: Logger,
        private _dataService: MediaPoolsService, private _mediaService: DocMediaService
        ) {
        this._logger.info('form : server pool Dialog.ts' );
    }

    ngOnInit() {
        this.action = this.data == null ? "Create" : "Update";

        this._mediaService.getList("").then((res: any) => {
            if (res.mediaList.length > 0) {
                this.mediaTypes = res.mediaList;
            }
        });

        this.ServerPoolItem = this.data != null ? this.data : {
            name: "",
            mediumType: [],
            maximumUsage: "",
            IsClient: false,
            usageType:""
        };
    }

   
}



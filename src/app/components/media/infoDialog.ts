import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { PluginDataService } from "../../services/pluginData.service";
import { DocMediaService } from "../../services/documentMedia.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Logger } from "angular2-logger/core";

@Component({
    selector: 'dialog-info',
    templateUrl: 'infoDialog.html'

})
export class InfoDialog {
    
    public mediaItem: any;
   

    

    constructor( @Inject(MD_DIALOG_DATA) public data: any, private _mediaService: DocMediaService, private _logger: Logger,
        private route: ActivatedRoute) {
        this._logger.info('Page : infoDialog.ts');
    }
    public pieChartLabels: string[] = ['Storage Used', 'Free Storage'];
    public pieChartData: number[] = [this.data.storageUsed, this.data.freeStorage];
    public pieChartType: string = 'pie';
    public pieChartLabels1: string[] = ['Cache Objects', 'Medium Objects'];
    public pieChartData1: number[] = [this.data.cacheObjects, this.data.mediumObjects];
    
  

    ngOnInit() {
        
       
        this.mediaItem = this.data;
        console.log(this.mediaItem);
        debugger;
        //this._pluginService.getList().then((res: any) => {
        //    if (res.pluginList.length > 0) {
        //        this.plugins = res.pluginList;
        //        console.log(this.plugins);
        //    }
        //});
    }
    updateValue(actionItem) {
            this._mediaService.update(actionItem).then((res: any) => {                                
            }, (error) => {
                this._logger.error('Error : ' + error);
            });        
    }    
}



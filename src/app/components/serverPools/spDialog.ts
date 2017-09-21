import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Logger } from "angular2-logger/core";

@Component({
    selector: 'dialog-serverpool',
    templateUrl: 'spDialog.html'

})
export class ServerPoolDialog { 
    

    constructor( @Inject(MD_DIALOG_DATA) public data: any, private _logger: Logger,
        ) {
        this._logger.info('form : server pool Dialog.ts' );
    }


   
}



import { Component, ViewEncapsulation, ViewChild, OnInit, NgModule, ElementRef } from '@angular/core';
import { Logger } from "angular2-logger/core";
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'page-serverpools',
    templateUrl: 'serverPools.html',

})
export class ServerPools {
    constructor(private _logger: Logger) {
        this._logger.info('form : serverpool.ts');
    }
   

    
   
}

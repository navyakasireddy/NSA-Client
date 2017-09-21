import { Component, ViewEncapsulation, ViewChild, OnInit, NgModule, ElementRef } from '@angular/core';
import { Logger } from "angular2-logger/core";

@Component({
    selector: 'page-globalpool',
    templateUrl: 'globalPools.html',

})
export class GlobalPools {
    constructor(private _logger: Logger) {
        this._logger.info('form : globalpool.ts');
    }
}

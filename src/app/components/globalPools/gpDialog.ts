import { Component, OnInit, Inject } from '@angular/core';
import { Logger } from "angular2-logger/core";

@Component({
    selector: 'dialog-globalpool',
    templateUrl: 'gpDialog.html'

})
export class GlobalPoolDialog {
    constructor(private _logger: Logger) {
        this._logger.info('form : globalpool Dialog.ts');
    }
}



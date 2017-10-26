import { Component, ViewEncapsulation, ViewChild, OnInit, NgModule, ElementRef } from '@angular/core';
import { Logger } from "angular2-logger/core";
import { DeleteDialog } from '../common/deleteDialog';
import { MdDialog, MdDialogRef, MdCard, MdSort, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { WriteBuffersDialog } from './writeBuffersDialog';
import { WriteBufferDataService } from "../../services/writeBuffers.service";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/table';


var tempwritebufferData: any[] = [];

@Component({
    selector: 'page-writeBuffers',
    templateUrl: 'writeBuffers.html',

})
export class WriteBuffers {
    dialogRef: MdDialogRef<WriteBuffersDialog>;
    dialogRefDel: MdDialogRef<DeleteDialog>;
    showList: boolean;
    @ViewChild(MdSort) sort: MdSort;
    displayedColumns: any[] = ["actions", "name", "data", "used", "objects", "write", "read", "verify", "error", "errorDelete", "writeRemote", "delete",
        "deleteRemote", "generatedRemote", "errorDR", "errorWR", "minFree",
        "maxSize", "table", "DBOperations", "DBOpsExecuted","DBOpsOptimized"];
    writebufferDatabase = new writebufferDatabase();
    dataSource: writebufferDataSource | null;


    constructor(private _logger: Logger
        , public dialog: MdDialog, public snackBar: MdSnackBar, private _dataService: WriteBufferDataService
    ) {
        this._logger.info('form : writebuffer.ts');
        this.GetData();
    }


    GetData() {
        this.showList = true;
        this._dataService.getList().then((res: any) => {
            if (res.globalPoolList.length > 0) {
                tempwritebufferData = res.globalPoolList;
                this.writebufferDatabase = new writebufferDatabase();
                this.dataSource = new writebufferDataSource(this.writebufferDatabase, this.sort);
            }
            else {
                this.showList = false;
            }
        }, (error) => {
            this._logger.error('Error : ' + error);
        });
    }

    onApplyAction(action: string, item) {
        if (action == 'update') {
            this.dialogRef = this.dialog.open(WriteBuffersDialog, {
                disableClose: true,
                data: item
            });

            this.dialogRef.afterClosed().subscribe(result => {
                console.log('result: ' + result);
                this.dialogRef = null;
                this.GetData();
                if (result != "")
                    this.openSnackBar(result, "");
            });
        }
        else if (action == 'delete') {
            this.dialogRefDel = this.dialog.open(DeleteDialog, {
                disableClose: true
            });


            this.dialogRefDel.afterClosed().subscribe(result => {
                if (result) {
                    this._dataService.Delete(item.globalPoolId).then((res: any) => {
                        console.log(res);
                        if (result != "")
                            this.openSnackBar(res.responseMsg, "");
                        this.GetData();
                        this.dialogRef = null;
                    }, (error) => {
                        this._logger.error('Error : ' + error);
                    });
                }


            });

        }
        else {
            this.dialogRef = this.dialog.open(WriteBuffersDialog, {
                disableClose: true
            });

            this.dialogRef.afterClosed().subscribe(result => {
                console.log('result: ' + result);
                this.dialogRef = null;
                if (result != "")
                    this.openSnackBar(result, "");
                this.GetData();
            });
        }
    }

    openSnackBar(message: string, action: string) {
        if (message != "") {
            let config = new MdSnackBarConfig();
            config.duration = 1600;
            config.extraClasses = ["position"];
            this.snackBar.open(message, action, config);
        }
    }
}


export interface writebufferData { };


export class writebufferDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<writebufferData[]> = new BehaviorSubject<writebufferData[]>([]);
    get data(): writebufferData[] { return this.dataChange.value; }

    constructor() {
        var self = this;
        if (tempwritebufferData != undefined && tempwritebufferData.length > 0) {
            const copiedData = self.data.slice();
            var item;

            tempwritebufferData.forEach(function (childitem) {
                copiedData.push(childitem);
                self.dataChange.next(copiedData);
            });
        }
        else {
            self.dataChange = new BehaviorSubject<writebufferData[]>([]);

        }
    }
}

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class writebufferDataSource extends DataSource<any> {
    constructor(private _writebufferDatabase: writebufferDatabase, private _sort: MdSort) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<writebufferData[]> {
        if (this._writebufferDatabase != undefined && this._sort != undefined) {
            const displayDataChanges = [
                this._writebufferDatabase.dataChange,
                this._sort.mdSortChange,
            ];

            return Observable.merge(...displayDataChanges).map(() => {
                return this.getSortedData();
            });
        }
    }

    disconnect() { }

    /** Returns a sorted copy of the database data. */
    getSortedData(): writebufferData[] {
        const data = this._writebufferDatabase.data.slice();
        if (!this._sort.active || this._sort.direction == '') { return data; }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';
            let indexValue = (this._sort.active.charAt(0).toLowerCase() + this._sort.active.slice(1).replace(" ", ""))
            propertyA = a[indexValue];
            propertyB = b[indexValue];
            let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
        });
    }
}

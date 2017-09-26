import { Component, ViewEncapsulation, ViewChild, OnInit, NgModule, ElementRef } from '@angular/core';
import { Logger } from "angular2-logger/core";
import { Router, RouterModule } from '@angular/router';
import { MdDialog, MdDialogRef, MdCard ,MdSort, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { DeleteDialog } from '../common/deleteDialog';
import { ServerPoolDialog } from './spDialog';
import { MediaPoolsService } from "../../services/mediapools.service";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
var tempserverpoolData: any[] = [];
import { DataSource } from '@angular/cdk/table';

@Component({
    selector: 'page-serverpools',
    templateUrl: 'serverPools.html',

})
export class ServerPools {
    dialogRef: MdDialogRef<ServerPoolDialog>;
    dialogRefDel: MdDialogRef<DeleteDialog>;
    showList: boolean;
    @ViewChild(MdSort) sort: MdSort;
    displayedColumns: any[] = ["actions", "serverPoolId", "name", "media", "maxUsage"];
    serverpoolDatabase = new serverpoolDatabase();
    dataSource: serverpoolDataSource | null;



    constructor(private _logger: Logger
        , public dialog: MdDialog, public snackBar: MdSnackBar, private _dataService: MediaPoolsService
    ) {
        this._logger.info('form : serverpool.ts');
        this.GetData();
    }


    GetData() {

        this.showList = true;
        this._dataService.getList("SP").then((res: any) => {                    
            if (res.serverPoolList.length > 0) {
                tempserverpoolData = res.serverPoolList;
                        this.serverpoolDatabase = new serverpoolDatabase();
                        this.dataSource = new serverpoolDataSource(this.serverpoolDatabase, this.sort);
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
            this.dialogRef = this.dialog.open(ServerPoolDialog, {
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
                    this._dataService.Delete(item.serverPoolId,"SP").then((res: any) => {
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
            this.dialogRef = this.dialog.open(ServerPoolDialog, {
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

export interface serverpoolData { };


export class serverpoolDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<serverpoolData[]> = new BehaviorSubject<serverpoolData[]>([]);
    get data(): serverpoolData[] { return this.dataChange.value; }

    constructor() {
        var self = this;
        if (tempserverpoolData != undefined && tempserverpoolData.length > 0) {
            const copiedData = self.data.slice();
            var item;

            tempserverpoolData.forEach(function (childitem) {
                copiedData.push(childitem);
                self.dataChange.next(copiedData);
            });
        }
        else {
            self.dataChange = new BehaviorSubject<serverpoolData[]>([]);

        }
    }
}

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class serverpoolDataSource extends DataSource<any> {
    constructor(private _serverpoolDatabase: serverpoolDatabase, private _sort: MdSort) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<serverpoolData[]> {
        if (this._serverpoolDatabase != undefined && this._sort != undefined) {
            const displayDataChanges = [
                this._serverpoolDatabase.dataChange,
                this._sort.mdSortChange,
            ];

            return Observable.merge(...displayDataChanges).map(() => {
                return this.getSortedData();
            });
        }
    }

    disconnect() { }

    /** Returns a sorted copy of the database data. */
    getSortedData(): serverpoolData[] {
        const data = this._serverpoolDatabase.data.slice();
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
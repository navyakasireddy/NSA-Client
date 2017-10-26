import { Component, ViewEncapsulation, ViewChild, OnInit, NgModule, ElementRef } from '@angular/core';
import { Logger } from "angular2-logger/core";
import { DeleteDialog } from '../common/deleteDialog';
import { MdDialog, MdDialogRef, MdCard, MdSort, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { CachesDialog } from './cachesDialog';
import { CachesDataService } from "../../services/caches.service";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/table';


var tempcachesData: any[] = [];

@Component({
    selector: 'page-caches',
    templateUrl: 'caches.html',

})
export class Caches {
    dialogRef: MdDialogRef<CachesDialog>;
    dialogRefDel: MdDialogRef<DeleteDialog>;
    showList: boolean;
    @ViewChild(MdSort) sort: MdSort;
    displayedColumns: any[] = ["actions", "name", "data", "objects", "write","read","verify","error","errorDelete","writeRemote"];
    cachesDatabase = new cachesDatabase();
    dataSource: cachesDataSource | null;


    constructor(private _logger: Logger
        , public dialog: MdDialog, public snackBar: MdSnackBar, private _dataService: CachesDataService
    ) {
        this._logger.info('form : caches.ts');
        this.GetData();
    }


    GetData() {
        this.showList = true;
        this._dataService.getList().then((res: any) => {
            if (res.cachesList.length > 0) {
                tempcachesData = res.cachesList;
                this.cachesDatabase = new cachesDatabase();
                this.dataSource = new cachesDataSource(this.cachesDatabase, this.sort);
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
            this.dialogRef = this.dialog.open(CachesDialog, {
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
                    this._dataService.Delete(item.cachesId).then((res: any) => {
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
            this.dialogRef = this.dialog.open(CachesDialog, {
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


export interface cachesData { };


export class cachesDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<cachesData[]> = new BehaviorSubject<cachesData[]>([]);
    get data(): cachesData[] { return this.dataChange.value; }

    constructor() {
        var self = this;
        if (tempcachesData != undefined && tempcachesData.length > 0) {
            const copiedData = self.data.slice();
            var item;

            tempcachesData.forEach(function (childitem) {
                copiedData.push(childitem);
                self.dataChange.next(copiedData);
            });
        }
        else {
            self.dataChange = new BehaviorSubject<cachesData[]>([]);

        }
    }
}

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class cachesDataSource extends DataSource<any> {
    constructor(private _cachesDatabase: cachesDatabase, private _sort: MdSort) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<cachesData[]> {
        if (this._cachesDatabase != undefined && this._sort != undefined) {
            const displayDataChanges = [
                this._cachesDatabase.dataChange,
                this._sort.mdSortChange,
            ];

            return Observable.merge(...displayDataChanges).map(() => {
                return this.getSortedData();
            });
        }
    }

    disconnect() { }

    /** Returns a sorted copy of the database data. */
    getSortedData(): cachesData[] {
        const data = this._cachesDatabase.data.slice();
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

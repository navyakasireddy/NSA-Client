import { Component, ViewEncapsulation, ViewChild, OnInit, NgModule, ElementRef } from '@angular/core';
import { Logger } from "angular2-logger/core";
import { DeleteDialog } from '../common/deleteDialog';
import { MdDialog, MdDialogRef, MdCard, MdSort, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { GlobalPoolDialog } from './gpDialog';
import { MediaPoolsService } from "../../services/mediapools.service";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/table';


var tempglobalpoolData: any[] = [];
@Component({
    selector: 'page-globalpool',
    templateUrl: 'globalPools.html',

})
export class GlobalPools {
    dialogRef: MdDialogRef<GlobalPoolDialog>;
    dialogRefDel: MdDialogRef<DeleteDialog>;
    showList: boolean;
    @ViewChild(MdSort) sort: MdSort;
    displayedColumns: any[] = ["actions", "id", "name", "serverPool", "condition"];
    globalpoolDatabase = new globalpoolDatabase();
    dataSource: globalpoolDataSource | null;


    constructor(private _logger: Logger
        , public dialog: MdDialog, public snackBar: MdSnackBar, private _dataService: MediaPoolsService
    ) {
        this._logger.info('form : globalpool.ts');
    }


    GetData() {
        this.showList = true;
        this._dataService.getList("GP").then((res: any) => {
            if (res.globalPoolList.length > 0) {
                tempglobalpoolData = res.globalPoolList;
                this.globalpoolDatabase = new globalpoolDatabase();
                this.dataSource = new globalpoolDataSource(this.globalpoolDatabase, this.sort);
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
            this.dialogRef = this.dialog.open(GlobalPoolDialog, {
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
                    this._dataService.Delete(item.pluginId,"GP").then((res: any) => {
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
            this.dialogRef = this.dialog.open(GlobalPoolDialog, {
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


export interface globalpoolData { };


export class globalpoolDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<globalpoolData[]> = new BehaviorSubject<globalpoolData[]>([]);
    get data(): globalpoolData[] { return this.dataChange.value; }

    constructor() {
        var self = this;
        if (tempglobalpoolData != undefined && tempglobalpoolData.length > 0) {
            const copiedData = self.data.slice();
            var item;

            tempglobalpoolData.forEach(function (childitem) {
                copiedData.push(childitem);
                self.dataChange.next(copiedData);
            });
        }
        else {
            self.dataChange = new BehaviorSubject<globalpoolData[]>([]);

        }
    }
}

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class globalpoolDataSource extends DataSource<any> {
    constructor(private _globalpoolDatabase: globalpoolDatabase, private _sort: MdSort) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<globalpoolData[]> {
        if (this._globalpoolDatabase != undefined && this._sort != undefined) {
            const displayDataChanges = [
                this._globalpoolDatabase.dataChange,
                this._sort.mdSortChange,
            ];

            return Observable.merge(...displayDataChanges).map(() => {
                return this.getSortedData();
            });
        }
    }

    disconnect() { }

    /** Returns a sorted copy of the database data. */
    getSortedData(): globalpoolData[] {
        const data = this._globalpoolDatabase.data.slice();
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

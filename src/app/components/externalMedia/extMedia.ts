import { Component, ViewEncapsulation, ViewChild, OnInit, NgModule, ElementRef } from '@angular/core';
import { Logger } from "angular2-logger/core";
import { DeleteDialog } from '../common/deleteDialog';
import { MdDialog, MdDialogRef, MdCard, MdSort, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ExtMediaDialog } from './extMediaDialog';
import { DocMediaService } from "../../services/documentMedia.service";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/table';
var tempextMediaData: any[] = [];

@Component({
    selector: 'page-extMedia',
    templateUrl: 'extMedia.html',

})
export class ExternalMedia {
    dialogRef: MdDialogRef<ExtMediaDialog>;
    dialogRefDel: MdDialogRef<DeleteDialog>;
    showList: boolean;
    @ViewChild(MdSort) sort: MdSort;
    displayedColumns: any[] = ["actions", "mediaId", "mediaName", "mediaStorageKind", "url"];
    extMediaDatabase = new extMediaDatabase();
    dataSource: extMediaDataSource | null;

    constructor(private _logger: Logger
        , public dialog: MdDialog, public snackBar: MdSnackBar, private _dataService: DocMediaService
    ) {
        this._logger.info('form : external media.ts');
    }


    GetData() {

        this.showList = true;
        this._dataService.getList("GP").then((res: any) => {
            if (res.cloudMediaList.length > 0) {
                tempextMediaData = res.cloudMediaList;
                this.extMediaDatabase = new extMediaDatabase();
                this.dataSource = new extMediaDataSource(this.extMediaDatabase, this.sort);
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
            this.dialogRef = this.dialog.open(ExtMediaDialog, {
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
                    this._dataService.Delete(item.pluginId).then((res: any) => {
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
            this.dialogRef = this.dialog.open(ExtMediaDialog, {
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
export interface extMediaData { };


export class extMediaDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<extMediaData[]> = new BehaviorSubject<extMediaData[]>([]);
    get data(): extMediaData[] { return this.dataChange.value; }

    constructor() {
        var self = this;
        if (tempextMediaData != undefined && tempextMediaData.length > 0) {
            const copiedData = self.data.slice();
            var item;

            tempextMediaData.forEach(function (childitem) {
                copiedData.push(childitem);
                self.dataChange.next(copiedData);
            });
        }
        else {
            self.dataChange = new BehaviorSubject<extMediaData[]>([]);

        }
    }
}

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class extMediaDataSource extends DataSource<any> {
    constructor(private _extMediaDatabase: extMediaDatabase, private _sort: MdSort) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<extMediaData[]> {
        if (this._extMediaDatabase != undefined && this._sort != undefined) {
            const displayDataChanges = [
                this._extMediaDatabase.dataChange,
                this._sort.mdSortChange,
            ];

            return Observable.merge(...displayDataChanges).map(() => {
                return this.getSortedData();
            });
        }
    }

    disconnect() { }

    /** Returns a sorted copy of the database data. */
    getSortedData(): extMediaData[] {
        const data = this._extMediaDatabase.data.slice();
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

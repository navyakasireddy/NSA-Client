import { Component, ViewEncapsulation, ViewChild, OnInit, NgModule, ElementRef } from '@angular/core';
import { Logger } from "angular2-logger/core";
import { MdDialog, MdDialogRef, MdCard, MdSort, MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { UsersDataService } from "../../../services/users.service";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/table';


var tempserverData: any[] = [];

@Component({
    selector: 'page-server',
    templateUrl: 'server.html',

})
export class ServerConfig {
    showList: boolean;
    @ViewChild(MdSort) sort: MdSort;
    displayedColumns: any[] = [ "User", "Role", "Station","Objects", "LastActive", "ActiveSince", "Client"];
    serverDatabase = new serverDatabase();
    dataSource: serverDataSource | null;


    constructor(private _logger: Logger
        , public dialog: MdDialog, public snackBar: MdSnackBar, private _dataService: UsersDataService
    ) {
        this._logger.info('form : server.ts');
        this.GetData();
    }


    GetData() {
        this.showList = true;
        this._dataService.getServerList().then((res: any) => {
            if (res.serverList.length > 0) {
                tempserverData = res.serverList;
                this.serverDatabase = new serverDatabase();
                this.dataSource = new serverDataSource(this.serverDatabase, this.sort);
            }
            else {
                this.showList = false;
            }
        }, (error) => {
            this._logger.error('Error : ' + error);
        });
    }
   
}


export interface serverData { };


export class serverDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<serverData[]> = new BehaviorSubject<serverData[]>([]);
    get data(): serverData[] { return this.dataChange.value; }

    constructor() {
        var self = this;
        if (tempserverData != undefined && tempserverData.length > 0) {
            const copiedData = self.data.slice();
            var item;

            tempserverData.forEach(function (childitem) {
                copiedData.push(childitem);
                self.dataChange.next(copiedData);
            });
        }
        else {
            self.dataChange = new BehaviorSubject<serverData[]>([]);

        }
    }
}

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class serverDataSource extends DataSource<any> {
    constructor(private _serverDatabase: serverDatabase, private _sort: MdSort) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<serverData[]> {
        if (this._serverDatabase != undefined && this._sort != undefined) {
            const displayDataChanges = [
                this._serverDatabase.dataChange,
                this._sort.mdSortChange,
            ];

            return Observable.merge(...displayDataChanges).map(() => {
                return this.getSortedData();
            });
        }
    }

    disconnect() { }

    /** Returns a sorted copy of the database data. */
    getSortedData(): serverData[] {
        const data = this._serverDatabase.data.slice();
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

import { Component, ViewEncapsulation, ViewChild, OnInit, NgModule, ElementRef } from '@angular/core';
import { Logger } from "angular2-logger/core";
import { MdDialog, MdDialogRef, MdCard, MdSort, MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { UsersDataService } from "../../../services/users.service";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/table';


var tempuserData: any[] = [];

@Component({
    selector: 'page-user',
    templateUrl: 'user.html',

})
export class User {
    showList: boolean;
    @ViewChild(MdSort) sort: MdSort;
    displayedColumns: any[] = ["actions", "User","Role", "Station", "Objects", "LastActive", "ActiveSince", "Client"];
    userDatabase = new userDatabase();
    dataSource: userDataSource | null;


    constructor(private _logger: Logger
        , public dialog: MdDialog, public snackBar: MdSnackBar, private _dataService: UsersDataService
    ) {
        this._logger.info('form : user.ts');
        this.GetData();
    }


    GetData() {
        this.showList = true;
        this._dataService.getUserList().then((res: any) => {
            if (res.userList.length > 0) {
                tempuserData = res.userList;
                this.userDatabase = new userDatabase();
                this.dataSource = new userDataSource(this.userDatabase, this.sort);
            }
            else {
                this.showList = false;
            }
        }, (error) => {
            this._logger.error('Error : ' + error);
        });
    }
   
}


export interface userData { };


export class userDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<userData[]> = new BehaviorSubject<userData[]>([]);
    get data(): userData[] { return this.dataChange.value; }

    constructor() {
        var self = this;
        if (tempuserData != undefined && tempuserData.length > 0) {
            const copiedData = self.data.slice();
            var item;

            tempuserData.forEach(function (childitem) {
                copiedData.push(childitem);
                self.dataChange.next(copiedData);
            });
        }
        else {
            self.dataChange = new BehaviorSubject<userData[]>([]);

        }
    }
}

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class userDataSource extends DataSource<any> {
    constructor(private _userDatabase: userDatabase, private _sort: MdSort) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<userData[]> {
        if (this._userDatabase != undefined && this._sort != undefined) {
            const displayDataChanges = [
                this._userDatabase.dataChange,
                this._sort.mdSortChange,
            ];

            return Observable.merge(...displayDataChanges).map(() => {
                return this.getSortedData();
            });
        }
    }

    disconnect() { }

    /** Returns a sorted copy of the database data. */
    getSortedData(): userData[] {
        const data = this._userDatabase.data.slice();
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

import { Component, ViewChild, ElementRef} from '@angular/core';
import { ModalDialog } from './modalDialog';
import { MdDialog, MdDialogRef } from '@angular/material';
import { GetDataService } from "../../services/getData.service";
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MdSort } from '@angular/material';

var pluginData: any = {};

@Component({
    selector: 'page-plugins',
    templateUrl: 'plugins.html'
})
export class Plugins {
    @ViewChild('filter') filter: ElementRef;
    dialogRef: MdDialogRef<ModalDialog>;
    // table start
    exampleDatabase;//= new ExampleDatabase();
    dataSource: ExampleDataSource | null;
    @ViewChild(MdSort) sort: MdSort;
    temppluginData: any = {};
    displayedColumns = ["id", "name", "type", "module"];
    constructor(private _dataService: GetDataService, public dialog: MdDialog) { }


    ngOnInit() {
        this.GetData();
    }

    GetData() {
        this._dataService.getList("plugins").then((res: any) => {
            this.temppluginData = res.pluginList;
            if (this.temppluginData.length > 0) {
                pluginData = this.temppluginData;
                
                console.log(pluginData);
                this.exampleDatabase = new ExampleDatabase()
                this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort);
                Observable.fromEvent(this.filter.nativeElement, 'keyup')
                    .debounceTime(150)
                    .distinctUntilChanged()
                    .subscribe(() => {
                        if (!this.dataSource) { return; }
                        this.dataSource.filter = this.filter.nativeElement.value;
                    });
            }
        }, (error) => {
        });
    }

    onApplyAction(action: string, item) {
        if (action == 'update') {
            this.dialogRef = this.dialog.open(ModalDialog, {
                disableClose: true,
                data: item
            });

            this.dialogRef.afterClosed().subscribe(result => {
                console.log('result: ' + result);
                this.dialogRef = null;
                this.GetData();
            });
        }
        else if (action == 'delete') {
            this._dataService.Delete(item.pluginId).then((res: any) => {
                console.log(res)
                this.GetData();
            }, (error) => {
            });
        }
        else {
            this.dialogRef = this.dialog.open(ModalDialog, {
                disableClose: true
            });

            this.dialogRef.afterClosed().subscribe(result => {
                console.log('result: ' + result);
                this.dialogRef = null;
                this.GetData();
            });
        }
    }
}


export interface pluginData {
    id: any;
    name: any;
    type: string;
    module: string,
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<pluginData[]> = new BehaviorSubject<pluginData[]>([]);
    get data(): pluginData[] { return this.dataChange.value; }

    constructor() {
        var self = this;
        if (pluginData != undefined) {
            const copiedData = self.data.slice();
            var item;
            pluginData.forEach(function (childitem) {


                item = {
                    id: childitem.pluginId,
                    name: childitem.name,
                    type: childitem.type,
                    module: childitem.module
                };
                copiedData.push(item);
                self.dataChange.next(copiedData);
            });
        }

    }
}

export class ExampleDataSource extends DataSource<any> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }

    constructor(private _exampleDatabase: ExampleDatabase, private _sort: MdSort) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<pluginData[]> {
        const displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._filterChange,
            this._sort.mdSortChange,
        ];
        //const displayDataSortChanges = [
        //    this._exampleDatabase.dataChange,

        //];
        return Observable.merge(...displayDataChanges).map(() => {


            if (this._filterChange.value.length > 0) {
                return this._exampleDatabase.data.slice().filter((item: pluginData) => {
                    let searchStr = (item.id + item.name + item.type + item.module).toLowerCase();
                    return searchStr.indexOf(this.filter.toLowerCase()) != -1;
                });
            }
            else {
                return this.getSortedData();
            }
        });
    }

    disconnect() { }

    /** Returns a sorted copy of the database data. */
    getSortedData(): pluginData[] {
        const data = this._exampleDatabase.data.slice();
        if (!this._sort.active || this._sort.direction == '') { return data; }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._sort.active) {
                case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
                case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
                case 'type': [propertyA, propertyB] = [a.type, b.type]; break;
                case 'module': [propertyA, propertyB] = [a.module, b.module]; break;

            }

            let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
        });
    }
}

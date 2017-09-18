import { Component, ViewChild, ElementRef, ViewContainerRef, OnInit } from '@angular/core';
import { MediaDialog } from './MediaDialog';
import { InfoDialog } from './InfoDialog';
import { MdDialog, MdDialogRef, MdCard, MdSort, Sort } from '@angular/material';
import { PluginDataService } from "../../services/pluginData.service";
import { DocMediaService } from "../../services/documentMedia.service";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DeleteDialog } from '../common/deleteDialog';

import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
var tempmediaData: any[] = [];
export interface mediaData { };

@Component({
    selector: 'page-media',
    templateUrl: 'media.html'
})
export class Media implements OnInit {
    @ViewChild(MdCard, { read: ViewContainerRef }) card;
    routeSubscription: any;
    dialogRef: MdDialogRef<MediaDialog>;
    dialogRefDel: MdDialogRef<DeleteDialog>;
    @ViewChild(MdSort) sort: MdSort;
    mediaType: string = "";
    showList: boolean ;
    displayedColumns: any[] = ["actions", "Id", "Name", "Type", "Storage Capacity", "Storage Used", "Cache Objects", "Generated On", "Retention Time", "Life"];
    mediaDatabase = new MediaDatabase();
    dataSource: MediaDataSource | null;

    constructor(public dialog: MdDialog, public snackBar: MdSnackBar, private _mediadataService: DocMediaService,
        private route: ActivatedRoute, private router: Router) {
        this.GetData()
    }

    ngOnInit() {
        this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this.route)
            // .map((route) => {
            //    while (route.firstChild) route = route.firstChild;
            //    return route;
            //})
            .filter((route) => route.outlet === 'primary')
            .subscribe((event) => this.GetData());
    }

    GetData() {
      
        this.showList = true;
        this.routeSubscription = this.route.params.subscribe(params => {
            this.mediaType = params['type'];
            console.log(this.mediaType);
            
            this._mediadataService.getList(this.mediaType).then((res: any) => {
                //this.displayedColumns = res.columnList;
                if (res.mediaList.length > 0) {
                    tempmediaData = res.mediaList;
                    this.mediaDatabase = new MediaDatabase();
                    this.dataSource = new MediaDataSource(this.mediaDatabase, this.sort);
                }
                else {                   
                    this.showList = false;
                }
            }, (error) => {
            });
        });
    }

  

    onApplyAction(action: string, item) {
        if (action == 'update') {
            this.dialogRef = this.dialog.open(MediaDialog, {
                disableClose: true,
                data: item
            });

            this.dialogRef.afterClosed().subscribe(result => {
                console.log('result: ' + result);
                this.dialogRef = null;
                this.GetData();
                this.openSnackBar(result, "");
            });
        }
        else if (action == 'delete') {
            this.dialogRefDel = this.dialog.open(DeleteDialog, {
                disableClose: true
            });

            this.dialogRefDel.afterClosed().subscribe(result => {
                if (result) {
                    this._mediadataService.Delete(item.id).then((res: any) => {
                        console.log(res)
                        this.openSnackBar(res.responseMsg, "");
                        this.GetData();
                        this.dialogRef = null;
                    }, (error) => {
                    });
                }
            });
        }
        else if (action == 'info') {
            //this.dialogRef =
            this.dialog.open(InfoDialog, {
                disableClose: true,
                data: item
            });
        }
        else if (action == 'create') {
            this.dialogRef = this.dialog.open(MediaDialog, {
                disableClose: true,
                data: this.mediaType
            });

            this.dialogRef.afterClosed().subscribe(result => {
                console.log('result: ' + result);
                this.dialogRef = null;
                this.openSnackBar(result, "");
                this.GetData();
            });
        }
        else if (action == 'lock') {
            item.documentMediaType = "CLOSED_MEDIA";
            this._mediadataService.update(item).then((res: any) => {
                console.log(res)
                this.openSnackBar(res.responseMsg, "");
                this.GetData();
                this.dialogRef = null;
            }, (error) => {
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

export class MediaDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<mediaData[]> = new BehaviorSubject<mediaData[]>([]);
    get data(): mediaData[] { return this.dataChange.value; }

    constructor() {
        var self = this;
        if (tempmediaData != undefined && tempmediaData.length > 0) {
            const copiedData = self.data.slice();
            var item;

            tempmediaData.forEach(function (childitem) {
                copiedData.push(childitem);
                self.dataChange.next(copiedData);
            });
        }
        else {
            self.dataChange = new BehaviorSubject<mediaData[]>([]);
            
        }
    }
}

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class MediaDataSource extends DataSource<any> {
    constructor(private _mediaDatabase: MediaDatabase, private _sort: MdSort) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<mediaData[]> {
        if (this._mediaDatabase != undefined && this._sort != undefined) {
            const displayDataChanges = [
                this._mediaDatabase.dataChange,
                this._sort.mdSortChange,
            ];

            return Observable.merge(...displayDataChanges).map(() => {
                return this.getSortedData();
            });
        }
    }

    disconnect() { }

    /** Returns a sorted copy of the database data. */
    getSortedData(): mediaData[] {
        const data = this._mediaDatabase.data.slice();
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
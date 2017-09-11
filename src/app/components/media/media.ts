import { Component, ViewChild, ElementRef, ViewContainerRef, OnInit } from '@angular/core';
import { MediaDialog } from './MediaDialog';
import { MdDialog, MdDialogRef, MdCard } from '@angular/material';
import { PluginDataService } from "../../services/pluginData.service";
import { DocMediaService } from "../../services/documentMedia.service";

import {  MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router, ActivatedRoute  } from '@angular/router';
import { DeleteDialog } from '../common/deleteDialog';


import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

var mediaData: any[]=[] ;

@Component({
    selector: 'page-media',
    templateUrl: 'media.html'
})
export class Media implements OnInit {

    @ViewChild(MdCard, { read: ViewContainerRef }) card;

    dialogRef: MdDialogRef<MediaDialog>;
    dialogRefDel: MdDialogRef<DeleteDialog>;
    prevType: string = "";
    mediaType: string = "";
    showList: boolean = true;
    displayedColumns: any[] = [
    ];
    dataSource = new ExampleDataSource();

    constructor(public dialog: MdDialog, public snackBar: MdSnackBar, private _mediadataService: DocMediaService,
        private routesRecognized: RoutesRecognized,
        private route: ActivatedRoute) { alert(routesRecognized.url);}

    ngDoCheck() {        
       
    }
    ngOnInit() {
        this.mediaType = this.route.snapshot.queryParams['mediaType'];
        this.GetData();
        
    }
    ngOnChanges() {
      
    }

    GetData() {
        this.showList = true;
        this.prevType = this.mediaType;
        this._mediadataService.getList(this.mediaType).then((res: any) => {
            this.displayedColumns = res.columnList;
            if (res.mediaList.length > 0) {
                for (var i = 0; i < res.mediaList.length; i++) {
                    var object = res.mediaList[i];                   
                    mediaData.push(object);
                }
            }
            else {
                this.showList = false;
            }
        }, (error) => {
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
                    //this._dataService.Delete(item.pluginId).then((res: any) => {
                    //    console.log(res)
                    //    this.openSnackBar(res.responseMsg, "");
                    //    this.GetData();
                    //    this.dialogRef = null;
                    //}, (error) => {

                    //});
                }


            });

        }
        else {
            this.dialogRef = this.dialog.open(MediaDialog, {
                disableClose: true
            });

            this.dialogRef.afterClosed().subscribe(result => {
                debugger;
                console.log('result: ' + result);
                this.dialogRef = null;
                this.openSnackBar(result, "");
                this.GetData();
            });
        }
    }


    openSnackBar(message: string, action: string) {
        let config = new MdSnackBarConfig();
        config.duration = 1600;
        config.extraClasses = ["position"];
        this.snackBar.open(message, action, config);
    }
}



 const data: any[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
    { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
    { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
    { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
    { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
    { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
    { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
    { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
    { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
    { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]> {
        return Observable.of(mediaData);
    }

    disconnect() { }
}
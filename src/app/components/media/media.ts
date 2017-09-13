import { Component, ViewChild, ElementRef, ViewContainerRef, OnInit } from '@angular/core';
import { MediaDialog } from './MediaDialog';
import { MdDialog, MdDialogRef, MdCard } from '@angular/material';
import { PluginDataService } from "../../services/pluginData.service";
import { DocMediaService } from "../../services/documentMedia.service";

import {  MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
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
    routeSubscription: any;
    dialogRef: MdDialogRef<MediaDialog>;
    dialogRefDel: MdDialogRef<DeleteDialog>;
   
    mediaType: string = "";
    showList: boolean = true;
    displayedColumns: any[] = ["Name", "Type", "Storage Capacity", "Storage Used", "Cache Objects", "Generated On", "Id", "Retention Time", "Life"];

    dataSource = new ExampleDataSource();

    constructor(public dialog: MdDialog, public snackBar: MdSnackBar, private _mediadataService: DocMediaService,        
        private route: ActivatedRoute, private router: Router) {
        
    }

    
    
    ngOnInit() {
        this.GetData();
            //this.router.events
            //    .filter((event) => event instanceof NavigationEnd)
            //    .map(() => this.route)
            //    .map((route) => {
            //        while (route.firstChild) route = route.firstChild;
            //        return route;
            //    })
            //    .filter((route) => route.outlet === 'primary')                
            //    .subscribe((event) => this.GetData());
        }
    

   
   

    GetData() {
        this.showList = true;
        this.routeSubscription = this.route.params.subscribe(params => {
            this.mediaType = params['type'];
          
            
      
        this._mediadataService.getList(this.mediaType).then((res: any) => {
            //this.displayedColumns = res.columnList;
            if (res.mediaList.length > 0) {
                for (var i = 0; i < res.mediaList.length; i++) {
                    var object = res.mediaList[i];                   
                    mediaData.push(object);
                }
            }
            else {
                mediaData = [] 
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
                disableClose: true,
                data: this.mediaType
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
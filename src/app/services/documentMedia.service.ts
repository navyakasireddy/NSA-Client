import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import * as json from '../../config/restconfig.json';
import { Logger } from "angular2-logger/core";
@Injectable()

export class DocMediaService {

    _serverURL: any;
    constructor(private _http: Http, private _requestOptions: RequestOptions, private _logger: Logger) {
        this._logger.info('Service :Document Media ');
        this._serverURL = json.restBaseURL + json.media;
    }
    getList(mediaType: string) {
        this._logger.info('MediaService : getList');
        let _url = this._serverURL + '/' + this.GetMediaType(mediaType);

        return new Promise((resolve, reject) => {
            this._http.post(_url, {})
                .map(res => res.json())
                .catch((error: any) => {
                    console.error(error);
                    reject(error);
                    return Observable.throw(error.json().error || 'Server error');
                })
                .subscribe((data) => {
                    resolve(data);
                });
        });
    }
    Delete(id: string) {
        this._logger.info('MediaService : Delete');
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        let _url = this._serverURL + "/" + id;

        return new Promise((resolve, reject) => {
            this._http.delete(_url, { headers: headers })
                .map(res => res.json())
                .catch((error: any) => {
                    console.error(error);
                    reject(error);
                    return Observable.throw(error.json().error || 'Server error');
                })
                .subscribe((data) => {
                    resolve(data);
                });
        });
    }

    update(actionItem: any) {
        this._logger.info('MediaService : update');
        console.log(actionItem);
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        let body = {
            "media": {
                "documentMediaType": actionItem.documentMediaType,
                "id": actionItem.id,
                "name": actionItem.name,
                "type": actionItem.type,
                "location": actionItem.location,
                "generatedOn": actionItem.generatedOn,
                "storageUsed": actionItem.storageUsed,
                "freeStorage": actionItem.freeStorage,
                "storageCapacity": actionItem.storageCapacity,
                "objectCount": actionItem.objectCount,
                "unitSize": actionItem.unitSize,
                "cacheObjects": actionItem.cacheObjects,
                "mediumObjects": actionItem.mediumObjects,
                "usage": actionItem.usage,
                "retentionTime": actionItem.retentionTime,
                "life": actionItem.life,
                "retentionPlace": actionItem.retentionPlace,
                "plugin": {
                    "pluginId": actionItem.plugin.pluginId,
                    "name": actionItem.plugin.name,
                    "type": actionItem.plugin.type,
                    "module": actionItem.plugin.module,
                    "status": actionItem.plugin.status
                },
                "maxNoOfObjects": actionItem.maxNoOfObjects,
                "maximumSize": actionItem.maximumSize,
                "timeOut": actionItem.timeOut,
                "openTransactions": actionItem.openTransactions,
                "transactionData": actionItem.transactionData,
                "container": actionItem.container,
                "dataHashActive": actionItem.dataHashActive,
                "namedPool": actionItem.namedPool
            }
        }

        let _url = this._serverURL;

        return new Promise((resolve, reject) => {
            this._http.put(_url, body, { headers: headers })
                .map(res => res.json())
                .catch((error: any) => {
                    console.error(error);
                    reject(error);
                    return Observable.throw(error.json().error || 'Server error');
                })
                .subscribe((data) => {
                    resolve(data);
                });
        });
    }

    create(actionItem: any) {
        this._logger.info('MediaService : create');
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        let body = {
            "media": {
                "documentMediaType": this.GetMediaType(actionItem.documentMediaType),
               // "id": actionItem.id,
                "name": actionItem.name,
                "type": actionItem.type,
                "location": actionItem.location,
                "generatedOn": actionItem.generatedOn,
                "storageUsed": actionItem.storageUsed,
                "freeStorage": actionItem.freeStorage,
                "storageCapacity": actionItem.storageCapacity,
                "objectCount": actionItem.objectCount,
                "unitSize": actionItem.unitSize,
                "cacheObjects": actionItem.cacheObjects,
                "mediumObjects": actionItem.mediumObjects,
                "usage": actionItem.usage,
                "retentionTime": actionItem.retentionTime,
                "life": actionItem.life,
                "retentionPlace": actionItem.retentionPlace,
                "plugin": {
                    "pluginId": actionItem.plugin.pluginId,
                    "name": actionItem.plugin.name,
                    "type": actionItem.plugin.type,
                    "module": actionItem.plugin.module,
                    "status": actionItem.plugin.status
                },
                "maxNoOfObjects": actionItem.maxNoOfObjects,
                "maximumSize": actionItem.maximumSize,
                "timeOut": actionItem.timeOut,
                "openTransactions": actionItem.openTransactions,
                "transactionData": actionItem.transactionData,
                "container": actionItem.container,
                "dataHashActive": actionItem.dataHashActive,
                "namedPool": actionItem.namedPool
            }
        }

        let _url = this._serverURL;

        return new Promise((resolve, reject) => {
            this._http.post(_url, body, { headers: headers })
                .map(res => res.json())
                .catch((error: any) => {
                    console.error(error);
                    reject(error);
                    return Observable.throw(error.json().error || 'Server error');
                })
                .subscribe((data) => {
                    resolve(data);
                });
        });
    }

    GetMediaType(mediatype: string) {
        //return "ALL_MEDIA";
        switch (mediatype) {
            case "Removable media": return "REMOVABLE_MEDIA";
            case "Migrated media": return "MIGRATED_MEDIA"; 
            case "Buffer media": return "BUFFER_MEDIA";
            case "Imported media": return  "IMPORTED_MEDIA"; 
            case "Closed media": return "CLOSED_MEDIA";
            case "All media": return "ALL_MEDIA";
            default: return "ALL_MEDIA"; 
        }
    }
}  
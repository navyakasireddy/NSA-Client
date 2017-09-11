import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import * as json from '../../config/restconfig.json';

@Injectable()

export class DocMediaService {

    _serverURL: any;
    constructor(private _http: Http, private _requestOptions: RequestOptions) {

        this._serverURL = json.restBaseURL + json.media;
    }
    getList(mediaType: string) {
        let _url = this._serverURL + '/' + mediaType; 

        return new Promise((resolve, reject) => {
            this._http.get(_url)
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

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        let body = {
            "media": {
                "id": actionItem.mediaID,
                "name": "nas1_update",
                "type": "virtual",
                "storageCapacity": 1024,
                "plugin": {
                    "pluginId": "1"
                }
            }
        };

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
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        let body = {
            "media": {
                "documentMediaType": actionItem.documentMediaType,
                "name": actionItem.mediumDesc,
                "type": "virtual",
                "storageCapacity": actionItem.storageCapacity,
                "maxNoOfObjects": actionItem.maxNumber,
                "maximumSize": actionItem.maxSize,
                "timeOut": actionItem.timeOut,
                "container": actionItem.isContainer,

                "plugin": {
                    "pluginId": actionItem.pluginValue
                }
            }
        };

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
}  
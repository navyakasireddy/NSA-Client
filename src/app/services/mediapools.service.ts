import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Logger } from "angular2-logger/core";
import 'rxjs/Rx';
import * as json from '../../config/restconfig.json';
@Injectable()

export class MediaPoolsService {

    _serverURL: any;
    constructor(private _http: Http, private _requestOptions: RequestOptions,private _logger: Logger) {
        this._logger.info('Service : Media Pools');
        this._serverURL = json.restBaseURL + json.plugin;
    }
    getList() {
        this._logger.info('MediapoolsService : getList');
        let _url = this._serverURL; 
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('X-ECM-LicenseType', '3');
        headers.append('X-ECM-Tenant', 'system');        
        headers.append('Authorization', 'Basic YWRtaW5pc3RyYXRvcjpxYQ==');

        return new Promise((resolve, reject) => {
            this._http.get(_url, { headers: headers})
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
        this._logger.info('MediapoolsService : delete');
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('X-ECM-LicenseType', '3');
        headers.append('X-ECM-Tenant', 'system');
        headers.append('Authorization', 'Basic YWRtaW5pc3RyYXRvcjpxYQ==');

        let _url = this._serverURL + "/" + id;
        // let _options= new RequestOptions({headers:headers});
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
        this._logger.info('MediapoolsService : update');
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('X-ECM-LicenseType', '3');
        headers.append('X-ECM-Tenant', 'system');
        headers.append('Authorization', 'Basic YWRtaW5pc3RyYXRvcjpxYQ==');

        let body = {
            "plugin": {
                "pluginId": actionItem.pluginId,
                "name": actionItem.name,
                "type": actionItem.type,
                "module": actionItem.module
            }
        };

        let _url = this._serverURL;
        // let _options= new RequestOptions({headers:headers});
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
        this._logger.info('MediapoolsService : create');      
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('X-ECM-LicenseType', '3');
        headers.append('X-ECM-Tenant', 'system');
        headers.append('Authorization', 'Basic YWRtaW5pc3RyYXRvcjpxYQ==');


        let body = {
            "plugin": {
                "pluginId": "",
                "name": actionItem.name,
                "type": actionItem.type,
                "module": actionItem.module
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
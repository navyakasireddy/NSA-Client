import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Logger } from "angular2-logger/core";
import 'rxjs/Rx';
import * as json from '../../config/restconfig.json';
@Injectable()

export class PluginDataService {

    _serverURL: any;
    constructor(private _http: Http, private _requestOptions: RequestOptions,private _logger: Logger) {
        this._logger.info('Service : Plugin Data');
        this._serverURL = json.restBaseURL + json.plugin;
    }
    getList() {
        this._logger.info('PluginService : getList');
        let _url = this._serverURL; //+ "/Menu/GetMenuDetails?roleName=" + roleName;  

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
        this._logger.info('PluginService : delete');
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
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
        this._logger.info('PluginService : update');
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
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
        this._logger.info('PluginService : create');      
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

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
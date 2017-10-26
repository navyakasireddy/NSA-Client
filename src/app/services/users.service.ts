import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Logger } from "angular2-logger/core";
import 'rxjs/Rx';
import { StorageService } from "./storage.service";
import * as json from '../../assets/config/restconfig.json';
@Injectable()

export class UsersDataService {

    _serverURL: any;
    constructor(private _http: Http, private _requestOptions: RequestOptions, private _logger: Logger, private storageService: StorageService) {
        this._logger.info('Service : Cache Data');
        this._serverURL = json.restBaseURL + json.users;
    }

    getConnectionList() {
        this._logger.info('usersService : getConnectionList');
        let _url = this._serverURL;
        let headers = this.storageService.getHeaders();

        return new Promise((resolve, reject) => {
            this._http.get(_url, { headers: headers })
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

    getList() {
        this._logger.info('usersService : getList');
        let _url = this._serverURL; 
        let headers = this.storageService.getHeaders();

        return new Promise((resolve, reject) => {
            this._http.get(_url, { headers: headers })
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
        this._logger.info('usersService : delete');
        let headers = this.storageService.getHeaders();
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
        this._logger.info('usersService : update');
        let headers = this.storageService.getHeaders();
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
        this._logger.info('usersService : create');      
        let headers = this.storageService.getHeaders();

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
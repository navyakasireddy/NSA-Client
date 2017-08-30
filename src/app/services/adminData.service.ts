import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import * as json from '../../config/restconfig.json';
@Injectable()
export class AdminDataService {
    _serverURL: any;
    constructor(private _http: Http) {
        this._serverURL = json.restBaseURL + "resources/list/test";
    }
    getAdminListDetails() {
        let _url = this._serverURL;

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
}  
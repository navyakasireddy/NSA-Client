import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import * as json from '../../assets/config/restconfig.json';
@Injectable()
export class AdminDataService {
    _serverURL: any;
    constructor(private _http: Http) {
        this._serverURL = json.restBaseURL + json.treeView;
    }
    getTreeListDetails() {
        let _url = this._serverURL;
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('X-ECM-LicenseType', '3');
        headers.append('X-ECM-Tenant', 'system');
        headers.append('Authorization', 'Basic YWRtaW5pc3RyYXRvcjpxYQ==');
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
}  
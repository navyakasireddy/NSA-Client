import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class GetDataService {
    _serverURL: any;
    constructor(private _http: Http, private _requestOptions: RequestOptions) {
        this._serverURL = "http://pc07vpnw:8080/nsac-packaging-1.0-SNAPSHOT/api/documents/plugin";
    }
    getList(dataType: string) {
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
        let headers = new Headers();
        headers.append('Accept', 'application/json');
      //  headers.append('Content-Type', 'application/json');
        let _url = this._serverURL + "/" + id; 
        // let _options= new RequestOptions({headers:headers});
        return new Promise((resolve, reject) => {
            this._http.delete(_url, { headers: headers })
                .map(res => res)
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
        debugger;
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        let body = {
            "plugin": {
                "name": actionItem.name,
                "type": actionItem.type,
                "module": actionItem.module
            }
        };

        let _url = this._serverURL + "/" + actionItem.id;
        // let _options= new RequestOptions({headers:headers});
        return new Promise((resolve, reject) => {
            this._http.put(_url, body, { headers: headers })
                .map(res => res)
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
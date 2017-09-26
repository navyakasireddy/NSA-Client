import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Logger } from "angular2-logger/core";
import 'rxjs/Rx';
import * as json from '../../assets/config/restconfig.json';
@Injectable()

export class MediaPoolsService {
    constructor(private _http: Http, private _requestOptions: RequestOptions,private _logger: Logger) {
        this._logger.info('Service : Media Pools');
       
    }

    getList(type:string) {
        this._logger.info('MediapoolsService : getList');
        let _url = this.getURL(type); 
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
    Delete(id: string,type:string) {
        this._logger.info('MediapoolsService : delete');
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('X-ECM-LicenseType', '3');
        headers.append('X-ECM-Tenant', 'system');
        headers.append('Authorization', 'Basic YWRtaW5pc3RyYXRvcjpxYQ==');

        let _url = this.getURL(type) + "/" + id;
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

    update(actionItem: any,type : string) {
        this._logger.info('MediapoolsService : update');
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('X-ECM-LicenseType', '3');
        headers.append('X-ECM-Tenant', 'system');
        headers.append('Authorization', 'Basic YWRtaW5pc3RyYXRvcjpxYQ==');
        let body = {};

        if (type === "SP") {
            body = {
                "serverPool": {
                    "serverPoolId": actionItem.serverPoolId,
                    "name": actionItem.name,
                    "maxUsage": actionItem.maxUsage,
                    "maxUsageType": actionItem.maxUsageType,
                    "client": actionItem.client,
                    "media": actionItem.media
                }
            };
        }
        else if (type === "GP") {
            body = {
                "globalPool": {
                    "globalPoolId": actionItem.globalPoolId,
                    "name": actionItem.name ,
                    "condition": actionItem.condition,
                    "srsprofile": actionItem.srsprofile,
                    "client": actionItem.client ,
                    "profile": actionItem.profile ,
                    "serverPool": actionItem.serverPool
                }
            };
        }

        let _url = this.getURL(type);
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

    create(actionItem: any, type:string) {  
        this._logger.info('MediapoolsService : create');      
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('X-ECM-LicenseType', '3');
        headers.append('X-ECM-Tenant', 'system');
        headers.append('Authorization', 'Basic YWRtaW5pc3RyYXRvcjpxYQ==');
        let body = {};
        if (type === "SP") {
            body = {
                "serverPool": {
                    "name": actionItem.name ,
                    "maxUsage": actionItem.maxUsage,
                    "maxUsageType": actionItem.maxUsageType,
                    "client": actionItem.client,
                    "media": actionItem.media
                }
            };
        }
        else if (type === "GP") {
            body = {
                "globalPool": {
                   
                    "name": actionItem.name,
                    "condition": actionItem.condition,
                    "srsprofile": actionItem.srsprofile,
                    "client": actionItem.client,
                    "profile": actionItem.profile,
                    "serverPool": actionItem.serverPool
                }
            };
        }


        let _url = this.getURL(type);

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


    getURL(type: string): string {
        if (type === "SP")
            return json.restBaseURL + json.serverPool;
        else
            return json.restBaseURL + json.globalPool;
    }
}  
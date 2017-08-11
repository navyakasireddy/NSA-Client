import { Injectable, Inject } from '@angular/core';  
import { Observable } from 'rxjs/Observable';  
import { Http } from '@angular/http';  
import 'rxjs/Rx';  
  
@Injectable()  
export class AdminDataService {  
_serverURL : any;
    constructor(private _http: Http) {  
        this._serverURL = "http://pc0d6vxb:8080/nsac-packaging-1.0-SNAPSHOT/api/resources/list/test";  
    }      
getAdminListDetails() {  
            let _url = this._serverURL; //+ "/Menu/GetMenuDetails?roleName=" + roleName;  
  
            return new Promise((resolve, reject) => {  
                this._http.get(_url)  
                    .map(res =>res.json())  
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
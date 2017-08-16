import { Injectable, Inject } from '@angular/core';  
import { Observable } from 'rxjs/Observable';  
import { Http } from '@angular/http';  
import 'rxjs/Rx';  
  
@Injectable()  
export class GetDataService {  
_serverURL : any;
    constructor(private _http: Http) {  
        this._serverURL = "http://localhost:8080/nsac-packaging-1.0-SNAPSHOT/api/documents/plugin ";  
    }      
getList(dataType:string) {  
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
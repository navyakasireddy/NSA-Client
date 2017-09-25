/**
 * login service for handling authentication issues
 */
import { Http, RequestOptions, Headers } from '@angular/http';
import {Injectable} from "@angular/core";
import {Location} from '@angular/common';
import {StorageService} from "./storage.service";
import { Observable } from 'rxjs/Observable';

import { Logger } from "angular2-logger/core";
import * as json from '../../assets/config/restconfig.json';
const LOGIN_TOKEN = 'token';
const keyLocalRemindMe = 'local_storeLogonValues';
const keyLocalUsername = 'local_username';
const keyLocalTenant = 'local_tenant';

@Injectable()
export class LoginService {

  private credentialAuthentication: any;
  private tokenAuthentication: any;
  private googleAuthentication: any;
  private serviceConnection: any;
  private token: any;
  private static NSAUrl = json.restBaseURL + json.IPBaseURL;
  private static ecmsUrl = json.ecmBaseURL + json.ecmsUrl + '/';
  private static authUrl = json.ecmBaseURL + json.authUrl+ '/';



  private _currentUser: any = null;

  constructor(/*public events: Events,*/ private location: Location, private storageService: StorageService, private _http: Http, private _requestOptions: RequestOptions,private _logger: Logger
    ) {

      this._logger.info('Service : Login');
    //this.credentialAuthentication = this.appService.sdkService.CredentialAuthentication;
    //this.tokenAuthentication = this.appService.sdkService.TokenAuthentication;
    //this.googleAuthentication = this.appService.sdkService.GoogleAuthentication;
    //this.serviceConnection = this.appService.sdkService.ServiceConnection;

    // events.subscribe('login:failed', (error) => {
    //   console.log('login failed event received error: ', error);
    //   //this.router.navigateByUrl("/login", { skipLocationChange: false });
    // });
  }

   get currentUser(): any {
    return this._currentUser;
  }

  set currentUser(value: any) {
    this._currentUser = value;
  }

  public isLoggedIn(): boolean {
    this.token = this.storageService.getItem(LOGIN_TOKEN);
    
   // let currentServiceConn = this.appService.sdkService.currentServiceConnection;
    
    //check for empty object with ES5+, but can be slow for big 
    return (this.token !== null && Object.getOwnPropertyNames(this.token).length !== 0 )//&& currentServiceConn !== null);
  }
  
//  public isReallyLoggedIn(): Promise<any> {
    
//    let self = this;
//    return new Promise((resolve, reject) => {
//    if (!self.isLoggedIn()) {
//        resolve(false)
//    }
    
    
//      // create the authentication provider
//      let token = self.storageService.getItem(LOGIN_TOKEN);
//    let authProvider = new this.tokenAuthentication(LoginService.authUrl, token);
    
   
//      this.appService.sdkService.currentServiceConnection = this.appService.sdkService.getNewServiceConnection(LoginService.ecmsUrl, authProvider);
//      this.appService.sdkService.currentServiceConnection.login()
//        .then((token)=> {
//          console.log('logged in to saperion,\nreceived token\n', JSON.stringify(token.token));
//          self.token = token.toJson();
//          self.storageService.setItem(LOGIN_TOKEN, self.token);
//          resolve(true);
//        }, (error) => {
//          console.error('login failed because of', error);
//          // on loginError, reset local token
//          // TODO: delete token only on 403
//          self.token = null;
//          self.storageService.setItem(LOGIN_TOKEN, null);
//          resolve(false);
//        })
//    });
//}
  

  // we need it as a promise
  public login(userName?: string, password?: string, tenant?: string, licenceType?: string){ //: Promise<any> {
      this._logger.info('LoginService : login');
      let headers = new Headers();
      headers.append('Authorization', 'Basic ' + this.getbase64encode(userName, password));
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');     
      headers.append('X-ECM-Tenant', tenant);
      headers.append('X-ECM-LicenseType', licenceType); 
      let _url = LoginService.authUrl +'api/token';
      // let _options= new RequestOptions({headers:headers});
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
    
  };


  private getbase64encode(userName?: string, password?: string): string {
      return  btoa(userName+':'+password);
  }

  public logout(): void {
  console.log('logout');
    this.storageService.removeItem(LOGIN_TOKEN);
    this.token = null;
    //this.appService.sdkService.currentServiceConnection = null;
  }


  
  public getLocalUsername():string {
        let user = this.storageService.getItem(keyLocalUsername);
        if (user != null && user.length > 0) {
            return user;
        } else {
            return '';
        }
  }
  
  public setLocalUsername(user:string):void {
        this.storageService.setItem(keyLocalUsername,user);
  }
  
  public getLocalTenant():string {
        let tenant = this.storageService.getItem(keyLocalTenant);
        if (tenant != null && tenant.length > 0) {
            return tenant;
        } else {
            return '';
        }
  }
  
  public setLocalTenant(tenant:string):void {
        this.storageService.setItem(keyLocalTenant,tenant);
  }
  
  public getLocalRemindMe():boolean {
        let remindMe = this.storageService.getItem(keyLocalRemindMe);
        if (remindMe != null) {
            return remindMe;
        } else {
            return false;
        }
  }
  
  public setLocalRemindMe(remindMe:boolean):void {
        this.storageService.setItem(keyLocalRemindMe,remindMe);
  }

  public connectToIP(IPvalue: string) {
      debugger;
      this._logger.info('LoginService : connectToIP');
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
     
    

      let _url = LoginService.NSAUrl +'/'+ IPvalue;
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

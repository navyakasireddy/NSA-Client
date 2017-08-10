/**
 * login service for handling authentication issues
 */

import {Injectable} from "@angular/core";
//import {Events} from "ionic-angular";
import {Location} from '@angular/common';
import {AppService} from "./app.service";
import {StorageService} from "./storage.service";

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

  private static baseUrl = 'http://ecm-service.saperion.com/';
  private static ecmsUrl = LoginService.baseUrl + 'ecms/';
  private static authUrl = LoginService.baseUrl + 'ecms-auth/';

  private _currentUser: any = null;

  constructor(/*public events: Events,*/ private location: Location, private appService: AppService, private storageService: StorageService) {

    this.credentialAuthentication = this.appService.sdkService.CredentialAuthentication;
    this.tokenAuthentication = this.appService.sdkService.TokenAuthentication;
    this.googleAuthentication = this.appService.sdkService.GoogleAuthentication;
    this.serviceConnection = this.appService.sdkService.ServiceConnection;

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
    
    let currentServiceConn = this.appService.sdkService.currentServiceConnection;
    
    //check for empty object with ES5+, but can be slow for big 
    return (this.token !== null && Object.getOwnPropertyNames(this.token).length !== 0 && currentServiceConn !== null);
  }
  
  public isReallyLoggedIn(): Promise<any> {
    
    let self = this;
    return new Promise((resolve, reject) => {
    if (!self.isLoggedIn()) {
        resolve(false)
    }
    
    
      // create the authentication provider
      let token = self.storageService.getItem(LOGIN_TOKEN);
    let authProvider = new this.tokenAuthentication(LoginService.authUrl, token);
    
   
      this.appService.sdkService.currentServiceConnection = this.appService.sdkService.getNewServiceConnection(LoginService.ecmsUrl, authProvider);
      this.appService.sdkService.currentServiceConnection.login()
        .then((token)=> {
          console.log('logged in to saperion,\nreceived token\n', JSON.stringify(token.token));
          self.token = token.toJson();
          self.storageService.setItem(LOGIN_TOKEN, self.token);
          resolve(true);
        }, (error) => {
          console.error('login failed because of', error);
          // on loginError, reset local token
          // TODO: delete token only on 403
          self.token = null;
          self.storageService.setItem(LOGIN_TOKEN, null);
          resolve(false);
        })
    });
}
  

  // we need it as a promise
  public login(userName?: string, password?: string, tenant?: string): Promise<any> {

    let license = this.credentialAuthentication.licenses.index;
    let authProvider;

    let self = this;

    return new Promise((resolve, reject) => {
      // create the authentication provider
      if (this.isLoggedIn()) {
        //the token is stored somewhere, so we can reuse it
        authProvider = new this.tokenAuthentication(LoginService.authUrl, this.token);
      } else {

        authProvider = new this.credentialAuthentication(LoginService.authUrl, userName, password, license, tenant);
      }

      this.appService.sdkService.currentServiceConnection = this.appService.sdkService.getNewServiceConnection(LoginService.ecmsUrl, authProvider);
      this.appService.sdkService.currentServiceConnection.login()
        .then((token)=> {
          console.log('logged in to saperion,\nreceived token\n', JSON.stringify(token.token));
          self.token = token.toJson();
          self.storageService.setItem(LOGIN_TOKEN, self.token);
          self.appService.sdkService.currentServiceConnection.getCurrentUser().then((user)=> {
            self.currentUser = user;
          },
            (error) => {

            });
          resolve();
        }, (error) => {
          console.error('login failed because of', error);
          // on loginError, reset local token
          // TODO: delete token only on 403
          self.token = null;
          self.storageService.setItem(LOGIN_TOKEN, null);
          reject(error);
        })
    });
  };

  public logout(): void {
  console.log('logout');
    this.storageService.removeItem(LOGIN_TOKEN);
    this.token = null;
    this.appService.sdkService.currentServiceConnection = null;
  }

  public googleLogin(tokenId: string ,tenant: string) {
    let license = this.googleAuthentication.licenses.index;
    let authProvider = new this.googleAuthentication(LoginService.authUrl, tokenId, license, tenant);

    let self = this;

    return new Promise((resolve, reject) => {
      this.appService.sdkService.currentServiceConnection = this.appService.sdkService.getNewServiceConnection(LoginService.ecmsUrl, authProvider);
      this.appService.sdkService.currentServiceConnection.login()
        .then((token)=> {
          console.log('logged in to saperion,\nreceived token\n', JSON.stringify(token.token));
          self.token = token.toJson();
          self.storageService.setItem(LOGIN_TOKEN, self.token);
          resolve();
        }, (error) => {
          console.error('login failed because of', error);
          // on loginError, reset local token
          // TODO: delete token only on 403
          self.token = null;
          self.storageService.setItem(LOGIN_TOKEN, null);
          reject(error);
        })
    });
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
}

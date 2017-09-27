/**
 * storage service for handling all storage issues
 */
import {Injectable} from "@angular/core";
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class StorageService {

   


  public getValue(key: string): string {
    return sessionStorage.getItem(key);
  }

  public setValue(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  public getItem(itemKey: string): any {
    return JSON.parse(sessionStorage.getItem(itemKey));
  }

  public setItem(itemKey: string, itemValue: any): void {
    sessionStorage.setItem(itemKey, JSON.stringify(itemValue));
  }

  public removeItem(itemKey: string): void {
    sessionStorage.removeItem(itemKey);
  }


  public getHeaders() {
      let token = this.getItem('token');
      let tenant = this.getItem('tenant');
      let LicenseType = this.getItem('LicenseType');
      let Basic = this.getItem('Basic');
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append('X-ECM-LicenseType', LicenseType);
      headers.append('X-ECM-Tenant', tenant);
      headers.append('Authorization', 'Basic ' + Basic);

      return headers;
  }
}

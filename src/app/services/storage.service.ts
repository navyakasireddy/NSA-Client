/**
 * storage service for handling all storage issues
 */
import {Injectable} from "@angular/core";

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
}

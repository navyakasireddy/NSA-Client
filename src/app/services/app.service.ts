import {Injectable} from "@angular/core";
import {MessageService} from "./message.service";
import {SDKService} from "./sdk.service";

@Injectable()
export class AppService{

  public readonly messageService = new MessageService();
  public readonly sdkService = new SDKService();

  constructor(){
  
  }

}

/*TODO:
  localization
  appInfo,
  features
  SDK,
  localStorage,

*/

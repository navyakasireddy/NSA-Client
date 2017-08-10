import {Injectable, ErrorHandler} from "@angular/core";
//import {Events} from "ionic-angular";

@Injectable()
export class EventService implements ErrorHandler{

  handleError(error: any): void {
    console.log(error);
  }

  constructor(/*public events: Events*/) {

  }



}

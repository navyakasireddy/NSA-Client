import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { LoginPage } from './login/login';
import {AppService} from '../services/app.service'
import {AppModule,ModuleConfiguration} from "../app.module";

import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: '../app.html'
})
export class MyApp {
isloggedin:any;
    rootPage:any = LoginPage;
    //availableApps = AppModule.availableApps;

  constructor(private router: Router, private appService: AppService,private loginService:LoginService) {
    this.isloggedin= this.loginService.isLoggedIn();
  let routerConfig = router.config;
  console.log('Routes: ', JSON.stringify(routerConfig, undefined, 2));
  //for (let app of this.availableApps) {
  //  let name = app.config.nameOnCard;
  //  let routes = app.config.routes
  //  console.log('Routes for ' + name + ': ', JSON.stringify(routes, undefined, 2));
  //  routerConfig = routes.concat(routerConfig);
  //}
   
  console.log('Routes AFTER MERGE: ', JSON.stringify(routerConfig, undefined, 2));
  router.resetConfig(routerConfig);
 
    //platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //appService.messageService.log("Appcontext plattform ready");
    //});
  }

 
}

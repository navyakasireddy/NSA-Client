import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AboutPage} from "../about/about";

import {AppService} from "../../services/app.service";
import {LoginService} from "../../services/login.service";

import {AppModule} from "../../app.module";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage implements OnInit{
  //aboutPage = AboutPage;
  availableApps = AppModule.availableApps;

  constructor(private router: Router, appService: AppService, private loginService: LoginService) {
    appService.messageService.log("Appcontext home constructor");
  }

ngOnInit() {
    console.log('Home ngOnInit');
    if (this.loginService.isLoggedIn()) {
        // logged in: present apps
    } else {
        // navigate to loginView
        //this.router.navigate(['login']);
    }
  }


  onLink(target) {
  this.router.navigate(target);
  }
}

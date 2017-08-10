import {Component} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'page-userInfo',
  templateUrl: 'userInfo.html'
})

export class UserInfoPage {

  currentUserName: string;


  constructor(private loginService: LoginService, private router: Router) {
    if (loginService.currentUser != null)
    {
      this.currentUserName = loginService.currentUser.shortName;
    }

  }
  onLogout() {
    this.loginService.logout();
    this.router.navigate(["home"]);
  }
  onHome() {
    this.router.navigate(["home"]);
  }
}

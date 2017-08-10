import { Component } from '@angular/core';
//import { NavController, NavParams } from 'ionic-angular';

import {LoginService} from "../../services/login.service";
import {HomePage} from "../home/home";
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(/*public navCtrl: NavController, public navParams: NavParams, */private loginService: LoginService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  logoutButtonPressed() {
    console.log('logoutButtonPressed');
    this.loginService.logout();
    // this.navCtrl.setRoot(HomePage);
    // this.navCtrl.push(LoginPage);
  }
}

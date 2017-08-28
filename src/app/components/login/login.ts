/**
 * login component to handle login view.
 */

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, RouterState, RouterStateSnapshot, ActivatedRouteSnapshot} from "@angular/router";
import {HomePage} from '../home/home';
import {Message} from '../nonModalMessages/nonModalMessage'
import {AppService} from "../../services/app.service";
import {LoginService} from "../../services/login.service";
import {FeatureService} from "../../services/feature.service";

declare const gapi: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

  returnUrl: string;
  componentData = null;

  // Form values
  public userName: string;
  public password: string;
  public tenant: string;
  public remindMe: boolean;

  private featureUseGoogleSignInEnabled: boolean = false;

  // control values
  public showGoogleLoginButton: boolean;
  public showEcmLoginButton: boolean;
  public showUsernameField: boolean;
  public showPasswordField: boolean;
  public showTenantField: boolean;
  public showMaskForGoogleLogin: boolean;

  public ecmLoginButtonText: string;

  /*Google Auth*/
  private auth2: any;
  private googleToken:string ="";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService, 
    private loginService: LoginService, 
    private featureService: FeatureService) {
    
    const state: RouterState = router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
    const root: ActivatedRouteSnapshot = snapshot.root;
    const child = root.firstChild;
    //const id: Observable<string> = child.params.map(p => p.id);
    //debugger;
    let self = this;

    featureService.load().then(function(){
        self.featureUseGoogleSignInEnabled = featureService.useGoogleSignIn;
        self.resetUI();

    },function(){
        self.resetUI();
    })
    this.resetUI();
  }

  /**
   * If the user is already logged in, we can forward to home view.
   * TODO: check if there is an earlier place for the check, because the user sees the login view for some seconds. Better will be a direct forwarding when the app starts.
   */
  ngOnInit() {
    console.log('ngOnInit');
    
    // get ReturnUrl or set to home
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'Documents';
    
    // load local stored data
    this.remindMe = this.loginService.getLocalRemindMe();
    if (this.remindMe) {
        this.userName = this.loginService.getLocalUsername();
        this.tenant = this.loginService.getLocalTenant();
    }
    
    
    this.googleInit();
    let self = this;
    if (this.loginService.isLoggedIn()) {
      this.loginService.login()
        .then(function () {
          console.log('logged in');
            // navigate to returnUrl
            self.router.navigate([self.returnUrl]);
        }, function (error) {
          console.log(error);
        });
    }
  }

  public googleInit() {
    let self = this;
    try {
    console.log('gapi availible');
        gapi.load('auth2', function () {
      self.auth2 = gapi.auth2.init({
        client_id: '669684142132-rtdp2id3pmsu1v3pn5veaq6ttbgk0elg.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
    });
    } catch(e) {
    setTimeout(() => {
              console.log('Load gapi again');
              this.googleInit();
          }, 1000);
    }
  }

  prepareUIElements() {
    if (this.showMaskForGoogleLogin) {
        this.showGoogleLoginButton = false;
        this.showEcmLoginButton = true;
        this.showUsernameField = false;
        this.showPasswordField = false;
        this.showTenantField = true;
        this.ecmLoginButtonText = "Continue";
    } else {
        this.showGoogleLoginButton = this.featureUseGoogleSignInEnabled;
        this.showEcmLoginButton = true;
        this.showUsernameField = true;
        this.showPasswordField = true;
        this.showTenantField = true;
        this.ecmLoginButtonText = "Sign in to ECMS";
    }

  }
  resetUI() {
    this.showMaskForGoogleLogin = false;
    this.prepareUIElements();
  }
  
  storeLocalItems() {
  // store local data
    this.loginService.setLocalRemindMe(this.remindMe);
    if (this.remindMe) {
        this.loginService.setLocalUsername(this.userName);
        this.loginService.setLocalTenant(this.tenant );
    } else {
        this.loginService.setLocalUsername(null);
        this.loginService.setLocalTenant(null);
    }
  }

  ecmLoginButtonPressed() {
    let self = this;
    self.router.navigate([self.returnUrl]);
    this.storeLocalItems();
    let successHandler = function () {
        console.log('logged in');
        // navigate to redirectUrl
        self.router.navigate([self.returnUrl]);
    };

    let errorHandler =  function (error) {
        self.componentData = {
          component: Message,
          inputs: {
            msg: error,
            type: 'error',
          }};
        console.log(error);
        self.resetUI();
      };

    // are we in googleSignInProcess
    if (this.showMaskForGoogleLogin) {
        this.loginService.googleLogin(this.googleToken, this.tenant)
            .then(successHandler, errorHandler);
    } else {
        this.loginService.login("nkasireddy", "konoha", "konoha")
            .then(successHandler,errorHandler);
    }
  }

  googleLoginButtonPressed() {
    this.storeLocalItems();
    let self = this;
    this.auth2.signIn().then(function() {
        let googleUser = self.auth2.currentUser.get();
        let profile = googleUser.getBasicProfile();
        var authResp = googleUser.getAuthResponse();

        //TODO: remove logs after successful test
        console.log('###############################');
        console.log('authResp: ' + JSON.stringify(authResp, null, 4));
        console.log('###############################');
        console.log('profile: ' + JSON.stringify(profile, null, 4));
        console.log('###############################');
        console.log('googleUser: ' + JSON.stringify(googleUser, null, 4));
        console.log('###############################');

        self.googleToken = authResp.id_token;
        self.showMaskForGoogleLogin=true;
        self.prepareUIElements();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterState, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { HomePage } from '../home/home';
import { Message } from '../nonModalMessages/nonModalMessage'
import { LoginService } from "../../services/login.service";
import { FeatureService } from "../../services/feature.service";
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar, MdSnackBarConfig } from '@angular/material';

declare const gapi: any;

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

    returnUrl: string;
    componentData = null;
    public IPvalue: string;
    showIPHolder: boolean = true;
    showProgress: boolean = false;

    public errorMessage: string="";
    public action: string;
    public pluginItem: any;

    // Form values
    public userName: string;
    public password: string;
    public tenant: string;
    public licenseType: string;
    public remindMe: boolean;
    
    licenseTypes = [
        { value: '1', viewValue: 'index' },
        { value: '2', viewValue: 'query' },
        { value: '3', viewValue: 'admin' }
    ];

    constructor(public dialog: MdDialog, public snackBar: MdSnackBar,
        private router: Router,
        private route: ActivatedRoute,
        private loginService: LoginService,
        private featureService: FeatureService) {

        const state: RouterState = router.routerState;
        const snapshot: RouterStateSnapshot = state.snapshot;
        const root: ActivatedRouteSnapshot = snapshot.root;
        const child = root.firstChild;
        //const id: Observable<string> = child.params.map(p => p.id);
        //debugger;
        let self = this;

    }

    /**
     * If the user is already logged in, we can forward to home view.
     * TODO: check if there is an earlier place for the check, because the user sees the login view for some seconds. Better will be a direct forwarding when the app starts.
     */
    ngOnInit() {
        console.log('ngOnInit');
        this.userName = "";
        this.password = "";
        this.tenant = "";
        // get ReturnUrl or set to home
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'Documents';
        let self = this;
        if (this.loginService.isLoggedIn()) {
            //this.loginService.login()
            //    .then(function () {
            //        console.log('logged in');
            //        // navigate to returnUrl
            //        self.router.navigate([self.returnUrl]);
            //    }, function (error) {
            //        console.log(error);
            //    });
        }
    }

    IPConnectButtonPressed() {
        let self = this;
        self.showProgress = true;
        self.showIPHolder = false;
        //this.loginService.connectToIP(this.IPvalue).then((res: any) => {
        //    console.log('IP connect' + this.IPvalue);
        //    self.showIPHolder = res.connectionActive ? false : true;
        //    self.errorMessage = "";
        //    self.openSnackBar("Server active", "");
        //}, function (error) {
        //    self.showIPHolder = true;
        //    console.log(error);
        //    self.showProgress = false;
        //   // self.errorMessage = "IP is inactive.";
        //    self.openSnackBar("Server not started", "");
        //});
    }


    ecmLoginButtonPressed() {
        let self = this;
        
        let successHandler = function () {
            console.log('logged in');
            // navigate to redirectUrl
            self.router.navigate([self.returnUrl]);
            self.errorMessage = "";
        };

        let errorHandler = function (error) {
            self.componentData = {
                component: Message,
                inputs: {
                    msg: error,
                    type: 'error',
                }
            };
            console.log(error);
            self.openSnackBar("Invalid Credentials,please try again.", "");
            //self.errorMessage=""
        };

        this.loginService.login(this.userName, this.password, this.tenant, this.licenseType)
        .then(successHandler, errorHandler);
    }

    openSnackBar(message: string, action: string) {
        debugger;
        let config = new MdSnackBarConfig();
        config.duration = 1600;
        config.extraClasses = ["position"];
        this.snackBar.open(message, action, config);
    }
}

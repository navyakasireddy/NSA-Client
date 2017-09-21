import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterState, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { HomePage } from '../home/home';
import { Message } from '../nonModalMessages/nonModalMessage'
import { LoginService } from "../../services/login.service";
import { FeatureService } from "../../services/feature.service";
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Logger } from "angular2-logger/core";
declare const gapi: any;

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

    returnUrl: string;
    public IPvalue: string;
    showIPHolder: boolean = true;
    showProgress: boolean = false;
    
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

    constructor(public dialog: MdDialog, public snackBar: MdSnackBar, private _logger: Logger,
        private router: Router,
        private route: ActivatedRoute,
        private loginService: LoginService,
        private featureService: FeatureService) {
        this._logger.info('form : login.ts');
    }

    /**
     * If the user is already logged in, we can forward to home view.
     * TODO: check if there is an earlier place for the check, because the user sees the login view for some seconds. Better will be a direct forwarding when the app starts.
     */
    ngOnInit() {
        
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
        this.loginService.connectToIP(this.IPvalue).then((res: any) => {
            console.log('IP connect' + this.IPvalue);
            self.showIPHolder = res.connectionActive ? false : true;
            this._logger.log("Logged in IP : " + this.IPvalue);
            self.openSnackBar("Server active", "");
        }, function (error) {
            self.showIPHolder = true;
            self.showProgress = false;
            this._logger.error('Error : '+error);
            self.openSnackBar("Server not started", "");
        });
    }


    ecmLoginButtonPressed() {
        let self = this;

        let successHandler = function () {
            this._logger.info("log-in success");
            // navigate to redirectUrl
            self.router.navigate([self.returnUrl]);
            
        };

        let errorHandler = function (error) {                  
            self.openSnackBar("Invalid Credentials,please try again.", "");
            this._logger.error('Error : ' + error);
        };

        this.loginService.login(this.userName, this.password, this.tenant, this.licenseType)
        .then(successHandler, errorHandler);
    }

    openSnackBar(message: string, action: string) {
        if (message != "") {
            let config = new MdSnackBarConfig();
            config.duration = 1600;
            config.extraClasses = ["position"];
            this.snackBar.open(message, action, config);
        }
    }
}

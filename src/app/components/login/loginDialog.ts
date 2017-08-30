import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { Router, ActivatedRoute, RouterState, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { LoginService } from "../../services/login.service";

import { Message } from '../nonModalMessages/nonModalMessage'
@Component({
    selector: 'login-dialog',
    templateUrl: 'loginDialog.html'

})
export class LoginDialog {
    private errorMessage: string;
    public action: string;
    public pluginItem: any;

    // Form values
    public userName: string;
    public password: string;
    public tenant: string;
    public remindMe: boolean;
    componentData = null;
    returnUrl: string;


    constructor( @Inject(MD_DIALOG_DATA) public data: any, private loginService: LoginService, private router: Router,
        private dialogRef: MdDialogRef<LoginDialog>) { }


    ngOnInit() {
        this.userName = "";
        this.password = "";
        this.tenant = "";
    }


    ecmLoginButtonPressed() {
        let self = this;
        self.router.navigate([self.returnUrl]);
        let successHandler = function () {
            console.log('logged in');
            // navigate to redirectUrl
            self.router.navigate([self.returnUrl]);
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

        };

        this.loginService.login(this.userName, this.password, this.tenant)
            //.then(successHandler, errorHandler);
    }
}



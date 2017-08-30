import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterState, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { HomePage } from '../home/home';
import { Message } from '../nonModalMessages/nonModalMessage'
import { LoginService } from "../../services/login.service";
import { FeatureService } from "../../services/feature.service";
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

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
    constructor(public dialog: MdDialog,
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
       this.showIPHolder = false;        
        this.loginService.connectToIP(this.IPvalue).then(function () {
            console.log('IP connect' + this.IPvalue);
           
            // navigate to returnUrl
          //  self.router.navigate([self.returnUrl]);
        }, function (error) {
            console.log(error);
        });
    }
}

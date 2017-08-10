import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {LoginService} from "./services/login.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private loginService: LoginService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        let self = this;
        return this.loginService.isReallyLoggedIn().then(function (res) {
            if (res) {
                return true;
            } else {
                self.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
                return false;
            }
        }, function (error) {
            self.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;    
        });
    }
}
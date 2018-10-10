import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService, AuthenticationService } from '../_services';
import { Subscription } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  loggedInSub: Subscription;

  constructor(private router: Router, private auth: AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    {
      if (!this.auth.isLoggedIn) {
        localStorage.setItem('authRedirect', state.url);
      }
      if (!this.auth.isLoggedIn) {
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url }
        });
        return false;
      }
      if (this.auth.isLoggedIn) {
        // if (localStorage.getItem('currentUser')) {
        //   // logged in so return true
        //   return true;
        // }
        return true;
        // this.auth.loggedIn$.subscribe(loggedIn => {
        //   if (loggedIn) {
        //     return true;
        //   }
        // });
      }
    }
  }
}

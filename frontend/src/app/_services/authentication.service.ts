import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subscription, of, timer } from 'rxjs';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserService } from '../_services/user.service';
@Injectable()
export class AuthenticationService {
  isLoggedIn: boolean;
  isAuthLive = false;
  isAdmin: boolean;
  authResult;
  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
  isAuthLive$ = new BehaviorSubject<boolean>(this.isAuthLive);

  loggingIn: boolean;
  accessToken: string;
  userProfile: any;
  expiresAt: number;
  // Subscribe to token expiration stream
  refreshSub: Subscription;
  routeSub: Subscription;
  constructor(
    private http: HttpClient,
    private router: Router,
    private _userService: UserService
  ) {}

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/auth/login`, {
        email: username,
        password: password
      })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          //   console.log(user, '--user');
          if (user && user.token) {
            this._userService.getMe(user.token).subscribe(
              data => {
                console.log(data, '--data');
                this._setSession(data);
                this._redirect();
                user = data;
                this.isLoggedIn = true;
                // this.router.navigate([this.returnUrl]);
              },
              error => {
                // this.alertService.error(error);
                this._clearRedirect();
                this.isLoggedIn = false;
                console.log(error);
                // this.loading = false;
              }
            );

            localStorage.setItem('isLoggedIn', 'true');
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        })
      );
  }

  setLoggedIn(value: boolean) {
    // Update login status behavior subject
    this.loggedIn$.next(value);
    this.isAuthLive$.next(value);
    this.loggedIn = value;
  }

  private _setSession(profile) {
    localStorage.setItem('currentUser', JSON.stringify(profile));
    // Store expiration in local storage to access in constructor
    this.accessToken = profile.token;
    // If initial login, set profile and admin information
    if (profile) {
      this.isAdmin = this._checkAdmin(profile);
    }
    // Update login status in loggedIn$ stream
    this.setLoggedIn(true);
    this.loggingIn = false;
    // Schedule access token renewal
    // this.scheduleRenewal();
  }

  private _checkAdmin(profile) {
    // Check if the user has admin role
    console.log(profile, '<<<---->>>');
    if (profile.roleType === 'Admin') {
      return true;
    } else {
      return false;
    }
  }

  private _redirect() {
    // Redirect with or without 'tab' query parameter
    // Note: does not support additional params besides 'tab'
    const fullRedirect = decodeURI(localStorage.getItem('authRedirect'));
    const redirectArr = fullRedirect.split('?tab=');
    const navArr = [redirectArr[0] || '/'];
    const tabObj = redirectArr[1]
      ? { queryParams: { tab: redirectArr[1] } }
      : null;

    if (!tabObj) {
      this.router.navigate(navArr);
    } else {
      this.router.navigate(navArr, tabObj);
    }
    // Redirection completed; clear redirect from storage
    this._clearRedirect();
  }

  private _clearRedirect() {
    // Remove redirect from localStorage
    localStorage.removeItem('authRedirect');
  }

  logout() {
    // remove user from local storage to log user out
    this._clearRedirect();
    localStorage.removeItem('currentUser');
    // Update login status in loggedIn$ stream
    this.setLoggedIn(false);
    this.isLoggedIn = false;
  }
}

import {
  Component,
  OnInit,
  DoCheck,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, AuthenticationService, UserService } from '../_services';
import { TestService } from '../test.service';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const user = localStorage.getItem('currentUser');

@Component({
  selector: 'app-my-navbar',
  templateUrl: './my-navbar.component.html',
  styleUrls: ['./my-navbar.component.css']
})
export class MyNavbarComponent implements OnInit, DoCheck {
  // @ViewChild('drawer') drawer: ElementRef;
  sideNave: MatSidenav;
  public isHide = true;
  public linksAfterLogIn = [];
  public linksBeforeLogIn = [];
  public sideNavLinks = [];
  public isLoggedIn: Subscription;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authenticationService: AuthenticationService,
    private _testService: TestService
  ) {}
  ngOnInit() {
    if (user) {
      this.authenticationService.isLoggedIn = true;
    } else {
      this.authenticationService.isLoggedIn = false;
    }
    for (const route of this.router.config) {
      if (route.data && route.data.label) {
        this.linksAfterLogIn.push({
          path: `/${route.path}`,
          label: route.data.label,
          icon: route.data.icon,
          isLoggedIn: this.isLoggedIn
        });
      } else if (route.data && route.data.sideNaveLabel) {
        this.sideNavLinks.push({
          path: `/${route.path}`,
          label: route.data.sideNaveLabel
        });
      }
    }
    // console.log(JSON.stringify(this.links));
  }
  ngDoCheck() {}
  togleMenu() {
    this.isHide = !this.isHide;
  }

  onLogout() {
    this.authenticationService.logout();
    this.sideNave.close();
  }
}

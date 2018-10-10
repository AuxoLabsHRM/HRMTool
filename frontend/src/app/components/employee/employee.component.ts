import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // this.loggedInSub = this.auth.loggedIn$.subscribe(
    //   loggedIn => {
    //     this.loading = true;
    //     if (loggedIn) {
    //       this._routeSubs();
    //     }
    //   }
    // );
  }
}

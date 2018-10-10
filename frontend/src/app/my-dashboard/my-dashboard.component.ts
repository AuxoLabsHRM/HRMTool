import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  Breakpoints,
  BreakpointState,
  BreakpointObserver
} from '@angular/cdk/layout';
import * as _ from 'lodash';
import { DashboardService } from '../_services/dashboard.service';
@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     console.log(matches, '---matches');

  //     // if (matches) {
  //     //   return [
  //     //     { title: 'Card 1', cols: 1, rows: 1 },
  //     //     { title: 'Card 2', cols: 1, rows: 1 },
  //     //     { title: 'Card 3', cols: 1, rows: 1 },
  //     //     { title: 'Card 4', cols: 1, rows: 1 }
  //     //   ];
  //     // }
  //     return [
  //       { title: 'Card 1', cols: 1, rows: 1 },
  //       { title: 'Card 2', cols: 1, rows: 1 },
  //       { title: 'Card 3', cols: 1, rows: 1 },
  //       { title: 'Card 4', cols: 1, rows: 1 },
  //       { title: 'Card 5', cols: 1, rows: 1 },
  //       { title: 'Card 6', cols: 1, rows: 1 },
  //       { title: 'Card 7', cols: 1, rows: 1 },
  //       { title: 'Card 8', cols: 1, rows: 1 }
  //     ];
  //   })
  // );

  dashboards;
  dashboardItems = [];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _dashboardService: DashboardService
  ) {}
  ngOnInit() {
    this._dashboardService
      .getDashboards()
      .pipe()
      .subscribe(data => {
        // console.log(data, '--data');
        this.dashboards = data;
        // console.log(this.dashboards, '--dashboards');
        this.dashboards.forEach((item, index) => {
          // console.log(item, index, '---item, index');
          let isBadge = false;
          const batchedBoards = [
            'My Projects',
            'Peoples',
            'Projects',
            'Reports'
          ];

          if (item.moduleName === 'My Projects') {
            isBadge = true;
          } else if (item.moduleName === 'Peoples') {
            isBadge = true;
          } else if (item.moduleName === 'Projects') {
            isBadge = true;
          } else if (item.moduleName === 'Reports') {
            isBadge = true;
          } else {
            isBadge = false;
          }
          this.dashboardItems.push({
            title: item.moduleName,
            cols: 1,
            rows: 1,
            controlName: item.data.detaiName.controlName,
            detailName: item.data.detaiName.detailName,
            iconSVG: item.data.detaiName.iconName,
            isBadge: isBadge
          });
        });

        console.log(this.dashboards, '---this.dashboards-->');
      });
  }
}
// const dashboards = [];

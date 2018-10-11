import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDatepickerModule } from '@angular/material';
import { ApplyLeaveComponent } from '../apply-leave/apply-leave.component';
import { QualificationService } from '../../../_services/qualification.service';
import { Router } from '@angular/router';
import { tick } from '@angular/core/testing';
import { remove, find, forEach } from 'lodash';

export interface empleavedtl {
  fromDate: string;
  toDate: string;
  note: string;
  leave: string;
  status: string;
}
export interface LeaveStatus {
  id: string;
  name: string;
}

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  userId: any = JSON.parse(localStorage.getItem('currentUser'))._id;
  leave_status: any;
  cancelbutton: any;
  noaction: any;
  tableLength: any;
  status: any;
  nonstatus = false;
  cancelaction = true;
  leaveStatus: any;
  
  displayedColumns: string[] = ['fromDate', 'toDate', 'note', 'leave','status', 'customColumn'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private qualificationservice: QualificationService,
    private dialog: MatDialog,
    private router: Router
  ) { }
  
  ngOnInit() {
    this.getleavedtl(this.userId);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  apply() {
  //   this.qualificationservice.isDialogOpen.emit(true);
  //   const dialogRef = this.dialog.open(ApplyLeaveComponent, {
  //     backdropClass: 'blureffect',
  //     panelClass: 'popup',
  //     disableClose: true,
  //     data: {
  //       issaveAction: 'SAVE'
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(res => {
  //     // this.geteducationDetails(this.userId);
  //   });

  
    this.router.navigate(['/Applyleave']);
  }

  getleavedtl(id){
    let leaveStatus = [
      {id: '1', name: 'Pending'},
      {id: '2', name: 'Approved'},
      {id: '3', name: 'Declined'},
      {id: '4', name: 'Cancel'}
    ];
    // Get leave details
    this.qualificationservice.getleavedtl(id).subscribe((res: any) =>{
      res.data.forEach(function (value,index) {
        leaveStatus.forEach(function (values) {
          if (value.status == values.id) {
            res.data[index].statusText = values.name;
          }
        });
      });
    this.dataSource.data = res.data;
      this.tableLength = res.data.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  leavecancel(){

  }
}

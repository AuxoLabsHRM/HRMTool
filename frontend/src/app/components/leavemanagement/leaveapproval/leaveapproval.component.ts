import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { QualificationService } from '../../../_services/qualification.service';


export interface LeaveReqData{
  employeeid: string;
  employeeName: string;
  fromDate: string;
  toDate: string;
  note: string;
  leave: string;
  leave_status: string;
}
export interface LeaveStatus{
  id: string;
  name: string;
}
@Component({
  selector: 'app-leaveapproval',
  templateUrl: './leaveapproval.component.html',
  styleUrls: ['./leaveapproval.component.scss']
})
export class LeaveapprovalComponent implements OnInit {
  userId: any = JSON.parse(localStorage.getItem('currentUser'))._id;
  tableLength: any;
  leavestatus: LeaveStatus[] =[
    {id: '1', name: 'Pending'},
    {id: '2', name: 'Approved'},
    {id: '3', name: 'Declined'},
    {id: '4', name: 'Cancel'}
  ]

  displayedColumns: string[] = ['employeeid', 'employeeName', 'fromDate', 'toDate', 'note', 'leave','leave_status', 'customColumn']
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private qualificationservice: QualificationService
  ) { }

  ngOnInit() {
    this.getleavereqlist(this.userId);
  }

  // Apply filter
  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    // filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Get leave request list
  getleavereqlist(id){
    this.qualificationservice.getleavereqlist(id).subscribe((res: any) => {
      this.dataSource.data = res.data;
      this.tableLength = res.data.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  // Apply leave by admin
  applyleavebyadmin(){

  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort,MatSnackBar } from '@angular/material';
import { QualificationService } from '../../../_services/qualification.service';
import {forEach, filter} from 'lodash';
import { DataSource } from '@angular/cdk/table';


export interface LeaveReqData{
  name: string;
  fromDate: string;
  toDate: string;
  note: string;
  days: string;
  status: string;
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
  name:any;
  displayedColumns: string[] = ['name', 'fromDate', 'toDate', 'note', 'days','status', 'customColumn']
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private qualificationservice: QualificationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getleavereqlist(this.userId);
    console.log(this.dataSource)
  }

  // Apply filter
  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Get leave request list
  getleavereqlist(id){
    let leaveStatus = [
      {id: '1', name: 'Pending'},
      {id: '2', name: 'Approved'},
      {id: '3', name: 'Declined'},
      {id: '4', name: 'Cancel'}
    ];
    this.qualificationservice.getleavedtl(id).subscribe((res: any) => {
      res.data.forEach(function (value,index) {
        leaveStatus.forEach(function (values) {
          if (value.status == values.id) {
            res.data[index].statusText = values.name;
          }
        });
      });
      
      let pendingList = res.data.filter(function (data) {
        return data.status == "1";
      })
      
      this.name = res.data[0].user.name;
    this.dataSource.data = pendingList;
      this.tableLength = pendingList.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     
    })
  }

  // Apply leave by admin
  applyleavebyadmin(){

  }

  approveleave(id,statusid){
    let data = {"status" : statusid}
    this.qualificationservice.approveleave(id,data).subscribe((res: any) => {
      if(res.ResultType == 1){
        this.snackBar.open(res.Message, '', {
          duration: 200,
          verticalPosition: 'top'
        });
        this.getleavereqlist(this.userId);
      }
      else{
        this.snackBar.open(res.Message, '', {
          duration: 500,
          verticalPosition: 'top'
        }); 
      }
    });
   
  }
}

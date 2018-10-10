import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDatepickerModule } from '@angular/material';
import { ApplyLeaveComponent } from '../apply-leave/apply-leave.component';
import { QualificationService } from '../../../_services/qualification.service';
import { Router } from '@angular/router';

export interface empleavedtl {
  employeeid: string;
  employeeName: string;
  fromDate: string;
  toDate: string;
  note: string;
}
const ELEMENT_DATA: empleavedtl[] = [
  {
    "employeeid": "AUX000",
    "employeeName": "Mythili",
    "fromDate": "01-09-2018",
    "toDate": "01-09-2018",
    "note":"Test"
  },
  {
    "employeeid": "AUX001",
    "employeeName": "Asha",
    "fromDate": "02-09-2018",
    "toDate": "02-09-2018",
    "note":"Test1"
  },
  {
    "employeeid": "AUX002",
    "employeeName": "Kirthi",
    "fromDate": "04-09-2018",
    "toDate": "06-09-2018",
    "note":"Test2"
  },
  {
    "employeeid": "AUX003",
    "employeeName": "Anu",
    "fromDate": "05-09-2018",
    "toDate": "05-09-2018",
    "note":"Test3"
  },
  {
    "employeeid": "AUX004",
    "employeeName": "Janu",
    "fromDate": "6-09-2018",
    "toDate": "06-09-2018",
    "note":"Test4"
  }
]
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
  
  userId: any = JSON.parse(localStorage.getItem('currentUser'))._id;
  
  displayedColumns: string[] = ['employeeid', 'employeeName', 'fromDate', 'toDate', 'note', 'customColumn'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private qualificationservice: QualificationService,
    private dialog: MatDialog,
    private router: Router
  ) { }
  


  ngOnInit() {

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  }

  ngAfterViewInit() {

    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // console.log(this.sort);
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
}

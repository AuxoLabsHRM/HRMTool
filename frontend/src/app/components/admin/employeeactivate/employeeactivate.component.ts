import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { QualificationService } from '../../../_services/qualification.service';
import { Router } from '@angular/router';
import { AlertComponents } from '../../../alert/alert.component';

export interface activeEmployee{
  // employeeid: string;
  employeeName: string;
  dateofJoining: string;
  dateofReleaving: string;
  status: string;
  // reason: string;
}
const activeemployee: activeEmployee[] = [
  {
  //  "employeeid": "AUX001",
   "employeeName": "Asha", 
   "dateofJoining": "24/06/2017",
   "dateofReleaving": "--",
   "status": "Active",
  //  "reason": "Personal reason"
  }
]
@Component({
  selector: 'app-employeeactivate',
  templateUrl: './employeeactivate.component.html',
  styleUrls: ['./employeeactivate.component.scss']
})
export class EmployeeactivateComponent implements OnInit {
  userId: any = JSON.parse(localStorage.getItem('currentUser'))._id;
  tableLength: any;

 

  displayedColumns: string[] = ['employeeName', 'dateofJoining', 'dateofReleaving', 'status', 'customColumn']
  // dataSource = new MatTableDataSource();
  dataSource = activeemployee;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private qualificationservice: QualificationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
  }

    // Apply filter
    applyFilter(filterValue: string){
      filterValue = filterValue.trim();
      // filterValue = filterValue.toLocaleLowerCase();
      // this.dataSource.filter = filterValue;
    }
  
    ngAfterViewInit(){
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    }
  
    // Get leave request list
    getleavereqlist(id){
      // this.qualificationservice.getleavereqlist(id).subscribe((res: any) => {
      //   this.dataSource.data = res.data;
      //   this.tableLength = res.data.length;
      //   this.dataSource.paginator = this.paginator;
      //   this.dataSource.sort = this.sort;
      // })
    }

  // Activate employee
    activateemp(id){
      const dialogRef = this.dialog.open(AlertComponents,{
        backdropClass: 'blureffect',
        panelClass: 'popup',
        disableClose: false,
        data: {
          msg: 'Do you want to activate this employee',
          type: 'confirm'
        }
      });

      dialogRef.afterClosed().subscribe((res: any) => {
        if(res){
          this.qualificationservice.deleteeducation(id).subscribe((res: any) => {
            if (res.ResultType == 1) {
              this.snackBar.open(res.Message, '', {
                duration: 3000,
                verticalPosition: 'top'
              });
              this.getleavereqlist(this.userId);
            }
            else{
              this.snackBar.open(res.Message, '', {
                duration: 2000,
                verticalPosition: 'top',
              });
            }
          }, 
          (error) => {
            this.snackBar.open(res.Message, '',{
              duration: 2000,
              verticalPosition: 'top'
            });
          }
          )
        }
      });
    }

    // Deactivate employee
    deactivateemp(id){
      const dialogRef = this.dialog.open(AlertComponents,{
        backdropClass: 'blureffect',
        panelClass: 'popup',
        disableClose: false,
        data: {
          msg: 'Do you want to deactivate this employee',
          type: 'confirm'
        }
      });

      dialogRef.afterClosed().subscribe((res: any) => {
        if(res){
          this.qualificationservice.deleteeducation(id).subscribe((res: any) => {
            if (res.ResultType == 1) {
              this.snackBar.open(res.Message, '', {
                duration: 3000,
                verticalPosition: 'top'
              });
              this.getleavereqlist(this.userId);
            }
            else{
              this.snackBar.open(res.Message, '', {
                duration: 2000,
                verticalPosition: 'top',
              });
            }
          }, 
          (error) => {
            this.snackBar.open(res.Message, '',{
              duration: 2000,
              verticalPosition: 'top'
            });
          }
          )
        }
      });
    }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { DependentService } from './../../_services/dependent.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QualificationService } from '../../_services/qualification.service';
import { AddEditDependentComponent } from '../add-edit-dependent/add-edit-dependent.component';
import { AlertComponents } from '../../alert/alert.component';

@Component({
  selector: 'app-dependents',
  templateUrl: './dependents.component.html',
  styleUrls: ['./dependents.component.scss']
})
export class DependentsComponent implements OnInit {

  displayedColumns = ['name', 'relationship', 'dateOfBirth', 'Action'];
  dataSource = new MatTableDataSource();
  public errorMsg;
  public tableLength;
  
  userId;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private snackBar: MatSnackBar, 
    private _listService : DependentService, 
    private router: Router, 
    private route: ActivatedRoute,
    private qualificationservice: QualificationService,
    private dialog: MatDialog
) {
    
   }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.getAllDependent(this.userId);
  }

  getAllDependent(userId) {
    this._listService.getAllDependent(userId).subscribe(
      (res) => {
      if (res.ResultType == 1) {
        this.dataSource.data = res.data;
        this.tableLength = res.data.length;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        // this.snackBar.open(res.Message, '', {
        //   duration: 2000
        // });
      }
     }, (error) => {
       this.errorMsg = error;
     });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteDependent(id) {
    const dialogRef = this.dialog.open(AlertComponents, {
      backdropClass: 'blureffect',
      panelClass: 'popup',
      disableClose: false,
      data: {
        msg: 'Are you sure want to delete?',
        type: 'confirm'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
    this._listService.deleteDependent(id).subscribe(
      (res) => {
      if (res.ResultType == 1) {
        this.snackBar.open(res.Message, '', {
          duration: 3000,
          verticalPosition: 'top'
        });
        this.getAllDependent(this.userId);
      } else {
        this.snackBar.open(res.Message, '', {
          duration: 2000,
          verticalPosition: 'top',
        });
      }
    }, (error) => {
      this.snackBar.open(error, '', {
        duration: 2000,
        verticalPosition: 'top'
      });
     });
    }
  });
  }

  editDependent(row){
    // this.router.navigate(['emergency_contact', 'edit', id]);
    this.qualificationservice.isDialogOpen.emit(true);
    const dialogRef = this.dialog.open(AddEditDependentComponent,{
      backdropClass: 'blureffect',
      panelClass: 'popup',
      disableClose: true,
      data: {
        data: row,
        issaveAction: 'UPDATE'
      }
      
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getAllDependent(this.userId);
    });
  }
  
  adddepentdent() {
    this.qualificationservice.isDialogOpen.emit(true);
    const dialogRef = this.dialog.open(AddEditDependentComponent, {
      backdropClass: 'blureffect',
      panelClass: 'popup',
      disableClose: true,
      data: {
        issaveAction: 'SAVE'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getAllDependent(this.userId);
    });
    
  }

}

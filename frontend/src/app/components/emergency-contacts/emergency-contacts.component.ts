import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { EmergencyService } from './../../_services/emergency.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertComponents } from '../../alert/alert.component';

@Component({
  selector: 'app-emergency-contacts',
  templateUrl: './emergency-contacts.component.html',
  styleUrls: ['./emergency-contacts.component.scss']
})
export class EmergencyContactsComponent implements OnInit {

  displayedColumns = ['name', 'relationship', 'homePhone', 'mobilePhone', 'Action'];
  dataSource = new MatTableDataSource();
  public errorMsg;
  public tableLength;
  userId;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private snackBar: MatSnackBar, private _listService : EmergencyService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog) {
    
   }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.getAllContact(this.userId);
  }

  getAllContact(userId) {
    this._listService.getAllContact(userId).subscribe(
      (res) => {
      if (res.ResultTye == 1) {
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

  deleteContact(id) {
    // Show Alert Dialog
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
        this._listService.deleteContact(id).subscribe(
          (res) => {
            if (res.ResultTye == 1) {
              this.snackBar.open(res.Message, '', {
                duration: 3000,
                verticalPosition: 'top'
              });
              this.getAllContact(this.userId);
            } else {
              this.snackBar.open(res.Message, '', {
                duration: 2000,
                verticalPosition: 'top'
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

  editContact(id){
    this.router.navigate(['emergency_contact', 'edit', id]);
  }

}

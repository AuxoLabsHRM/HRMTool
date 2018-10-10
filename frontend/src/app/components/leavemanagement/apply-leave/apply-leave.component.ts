import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent, MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDatepickerModule, MatDialogRef,MatSnackBar } from '@angular/material';
import { validateConfig } from '@angular/router/src/config';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
import { QualificationService } from '../../../_services/qualification.service';


export interface Type {
  id: string;
  name: string;
}
@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {
  userId: any = JSON.parse(localStorage.getItem('currentUser'))._id;
  applyleaveForm: FormGroup;
  leavecount = 0;
  types: Type[] = [
    {id: '0', name: 'Sick Leave'},
    {id: '1', name: 'Casual Leave'}
  ]
  constructor(private formbuilder: FormBuilder, 
    private snackBar: MatSnackBar,
    private router: Router,
    private qualificationservice: QualificationService
    // private dialogRef: MatDialogRef<ApplyLeaveComponent>
    ) { 
    this.applyleaveForm = formbuilder.group({
      'fromDate': [null, Validators.required],
      'toDate': [null, Validators.required],
      'leavetype': [null, Validators.required],
      'note': [null, Validators.required],
      'leave': [null]

    })
  }

  ngOnInit() {
  }

  error: any ='End Date greater then from date';

  applyleave(){
    let leaveObj = {};
    leaveObj['userId'] = this.userId,
    leaveObj['fromDate'] = this.applyleaveForm.controls.fromDate.value,
    leaveObj['toDate'] = this.applyleaveForm.controls.toDate.value,
    leaveObj['note'] = this.applyleaveForm.controls.note.value,
    leaveObj['leave'] = this.applyleaveForm.controls.leave.value
    let selectedleavetypeID = this.applyleaveForm.controls.leavetype.value
    let resultleave = this.types.filter(function (data) {
      return data.id == selectedleavetypeID
    })
    leaveObj['leavetype'] = (resultleave) ? resultleave[0] : {}
    if(this.applyleaveForm.valid){
      if(new Date(this.applyleaveForm.controls['toDate'].value)<new Date(this.applyleaveForm.controls['fromDate'].value)){
        this.snackBar.open(this.error, '', {
          duration: 3000,
          verticalPosition: 'top'
        });
     }
     this.qualificationservice.applyleave(JSON.stringify(leaveObj)).subscribe((response) => {
      console.log(response);
      if (response.ResultTye == 1) {
        this.snackBar.open(response.Message, '', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
      else {
        this.snackBar.open(response.Message, '', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
      this.router.navigate(['/leave']);
    },
    )
     
      console.log(this.applyleaveForm, '-testing---')
    }
   
  }

  close(){
    // this.dialogRef.close();
     this.router.navigate(['/leave'])
  }

  onDate(){
    var date1 = this.applyleaveForm.controls.fromDate.value;
    var date2 = this.applyleaveForm.controls.toDate.value;
    var diff = Math.abs(date1.getTime() - date2.getTime());
    var limit = (date1 == date2) ? 0 : 1;
    
     this.leavecount = Math.ceil(diff / (1000 * 3600 * 24))+ limit; 
    console.log(this.leavecount);
  
  }
}

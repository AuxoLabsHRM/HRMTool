import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent, MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDatepickerModule, MatDialogRef,MatSnackBar } from '@angular/material';
import { validateConfig } from '@angular/router/src/config';
import { Router } from '@angular/router';


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
  applyleaveForm: FormGroup;
  types: Type[] = [
    {id: '0', name: 'Sick Leave'},
    {id: '1', name: 'Casual Leave'}
  ]
  constructor(private formbuilder: FormBuilder, 
    private snackBar: MatSnackBar,
    private router: Router,
    // private dialogRef: MatDialogRef<ApplyLeaveComponent>
    ) { 
    this.applyleaveForm = formbuilder.group({
      'fromDate': [null, Validators.required],
      'toDate': [null, Validators.required],
      'leavetype': [null, Validators.required],
      'note': [null, Validators.required]

    })
  }

  ngOnInit() {
    console.log(this.applyleaveForm);
    
  }

  error: any ='End Date greater then from date';

  applyleave(){
    if(this.applyleaveForm.valid){
      if(new Date(this.applyleaveForm.controls['toDate'].value)<new Date(this.applyleaveForm.controls['fromDate'].value)){
        this.snackBar.open(this.error, '', {
          duration: 3000,
          verticalPosition: 'top'
        });
     }
      console.log(this.applyleaveForm, '-testing---')
    }
   
  }

  close(){
    // this.dialogRef.close();
     this.router.navigate(['/leave'])
  }
}

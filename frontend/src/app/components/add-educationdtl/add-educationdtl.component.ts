import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, Validators, FormGroup, NgForm } from '@angular/forms';
import { AlertPromise } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { QualificationService } from './../../_services/qualification.service';
export interface Qualification {
  id: string;
  name: string;
}
@Component({
  selector: 'app-add-educationdtl',
  templateUrl: './add-educationdtl.component.html',
  styleUrls: ['./add-educationdtl.component.css']

})
export class AddEducationdtlComponent implements OnInit {
  userId: any = JSON.parse(localStorage.getItem('currentUser'))._id;
  public dataofeducation: any;
  public isAction: any;
  public issaveAction: any;
  educationdtlForm: FormGroup;
  qualification: string = '';
  institute: string = '';
  fromDate: string = '';
  endDate: string = '';
  qualifications: Qualification[] = [
    { id: '0', name: 'Bachelors Degree' },
    { id: '1', name: 'Diploma' },
    { id: '2', name: 'Masters Degree' }
  ];

  public qualificationItems: Array<{ id: string, qualificationName: string }> = [];
  constructor(
    public dialogRef: MatDialogRef<AddEducationdtlComponent>,
    private fb: FormBuilder,
    private qualificationservice: QualificationService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {

    this.educationdtlForm = fb.group({
      'qualification': [null, Validators.required],
      'institute': [null, Validators.required],
      'fromDate': [null],
      'endDate': [null]
    });
  }

  ngOnInit() {
    console.log(this.educationdtlForm)

    this.dataofeducation = this.data;
    this.isAction = this.data.issaveAction;
    if (this.isAction != 'SAVE') {
      this.educationdtlForm.patchValue(this.dataofeducation.data);
      this.educationdtlForm.controls.qualification.patchValue(this.dataofeducation.data.qualification.id)
    }
    console.log(this.data)
  }

  close(): void {
    this.dialogRef.close();
  }
  onFormSubmit(form: NgForm) {
    console.log(form);
  }

  // createupdateeducation
  createupdateeducation() {
    let obj1 = {};
    obj1['userId'] = this.userId;
    obj1['institute'] = this.educationdtlForm.controls.institute.value;
    obj1['fromDate'] = this.educationdtlForm.controls.fromDate.value;
    obj1['endDate'] = this.educationdtlForm.controls.endDate.value;

    let selectedQualificationID = this.educationdtlForm.controls.qualification.value;
    let resultofQualification = this.qualifications.filter(function (data) {
      return data.id == selectedQualificationID
    })
    obj1['qualification'] = (resultofQualification) ? resultofQualification[0] : {}
    if (this.isAction == 'SAVE') {
      if(this.educationdtlForm.valid){
      this.qualificationservice.createeducation(JSON.stringify(obj1)).subscribe((response) => {
        console.log(response);
        if (response.ResultTye == 1) {
      this.dialogRef.close();
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
        this.router.navigate(['/Qualifications']);
      },
      )
    }
  }
    else if (this.isAction == 'UPDATE') {
      this.qualificationservice.updateeducationitem(this.dataofeducation.data._id, JSON.stringify(obj1)).subscribe((response) => {
        console.log(response);
        if (response.ResultTye == 1) {
          this.dialogRef.close();
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
        this.router.navigate(['/Qualifications']);
      },
      )
    }
  }

  // Get completion date
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }


}

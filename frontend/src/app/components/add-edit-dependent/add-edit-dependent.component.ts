import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, Validators, FormControl, NgForm } from '@angular/forms';
import  {MatDialog, MatDialogRef, MAT_DIALOG_DATA }  from '@angular/material'
import { Router } from '@angular/router';
import { DependentService } from '../../_services/dependent.service';
import { validateVerticalPosition } from '@angular/cdk/overlay';

export interface Rlationship {
  id: string;
  name: string;
} 
@Component({
  selector: 'app-add-edit-dependent',
  templateUrl: './add-edit-dependent.component.html',
  styleUrls: ['./add-edit-dependent.component.css']
})
export class AddEditDependentComponent implements OnInit {
  userId: any = JSON.parse(localStorage.getItem('currentUser'))._id;
  dependentForm: FormGroup;
  name: string = '';
  relationship: string = '';
  dateOfBirth: Date;
  public isAction: any;
  public dependentdata: any;
  relationships: Rlationship[] = [
  { id:'0', name:'Father'},
  { id:'1', name:'Mother'},
  { id:'2', name:'Spouse'},
  { id:'3', name:'Children'}

  ]
  constructor(
    private formbuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEditDependentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private dependentservice: DependentService
  ) { 
    this.dependentForm = this.formbuilder.group({
      'name': [null, Validators.required],
      'relationship': [null,Validators.required ],
      'dateOfBirth':[null,Validators.required]
    });
  }

  ngOnInit() {
    console.log(this.dependentForm)
    this.dependentdata = this.data;
    this.isAction = this.data.issaveAction;
    if(this.isAction != 'SAVE'){
      this.dependentForm.patchValue(this.dependentdata.data);
      this.dependentForm.controls.relationship.patchValue(this.dependentdata.data.relationship.id)
    }
  }

  // createupdatedependent

  createupdatedependent(){
    let dependentObj = {};
    dependentObj['userId'] = this.userId;
    dependentObj['name'] = this.dependentForm.controls.name.value;
    dependentObj['dateOfBirth'] = this.dependentForm.controls.dateOfBirth.value;
    let selectedRelationshipID = this.dependentForm.controls.relationship.value;
    let resultofrelation = this.relationships.filter(function (data) {
      return data.id == selectedRelationshipID
    })
    dependentObj['relationship'] = (resultofrelation) ? resultofrelation[0] : {}
    if (this.isAction == 'SAVE') {
      if(this.dependentForm.valid){
          this.dependentservice.addDependent(JSON.stringify(dependentObj)).subscribe((response) => {
            console.log(response);
          this.dialogRef.close();
            this.router.navigate(['/dependent']);
          },
          (errorResponse) => {
          }
        )
    }
  }
    else if (this.isAction == 'UPDATE') {
      this.dependentservice.updateDependent(this.dependentdata.data._id, dependentObj).subscribe((response) => {
        console.log(response);
        this.dialogRef.close();
        this.router.navigate(['/dependent']);
      },
      (errorResponse) => {
      }
    )
    }
  }

  cancel(){
    this.dialogRef.close();
  }
  onFormSubmit(form: NgForm) {
    console.log(form);
  }
    // Get date as current date
    getToday(): string {
      return new Date().toISOString().split('T')[0]
    }
}

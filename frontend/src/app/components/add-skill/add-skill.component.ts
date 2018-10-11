import { Component, OnInit, NgZone, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material';
import { QualificationService } from './../../_services/qualification.service';
// export interface Skill {
//   id: string;
//   name: string;
// }
export interface Skill {
  id: string;
  name: string;
}
@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {
  userId: any = JSON.parse(localStorage.getItem('currentUser'))._id;
  addskillForm: FormGroup;
  detail: string = '';
  skills: Skill[] = [
    { id: '0', name: 'Project Management' },
    { id: '1', name: 'Networking' },
    { id: '2', name: 'Databases' }
  ];

  // Drop down with api
  public skillItems: Array<{ id: string, skillName: string }> = [];
  public dataColl: any;
  public isAction: any;
  constructor(
    private snackBar: MatSnackBar,
    private ngZone: NgZone,
    private fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<AddSkillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private qualificationservice: QualificationService,
  ) {

    this.addskillForm = fb.group({
      'skill': [null, Validators.required],
      'detail': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.dataColl = this.data;
    this.isAction = this.data.issaveAction;
    if (this.isAction != 'SAVE') {
      this.addskillForm.patchValue(this.dataColl.data);
      this.addskillForm.controls.skill.patchValue(this.dataColl.data.skill.id);
    }
    console.log(this.addskillForm)
  }

  // createupdateskill
  createupdateskill() {
    let obj1 = {};
    obj1['userId'] = this.userId;
    obj1['detail'] = this.addskillForm.controls.detail.value;

    let selectedSkillID = this.addskillForm.controls.skill.value;
    let resultSkill = this.skills.filter(function (data) {
      return data.id == selectedSkillID
    })
    obj1['skill'] = (resultSkill) ? resultSkill[0] : {}
    if (this.isAction == 'SAVE') {
      if(this.addskillForm.valid){
      this.qualificationservice.createskill(JSON.stringify(obj1)).subscribe((response) => {
        console.log(response);
        if (response.ResultType == 1) {
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
      this.qualificationservice.updateskillitem(this.dataColl.data._id, obj1).subscribe((response) => {
        console.log(response);
        if (response.ResultType == 1) {
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


  // Executed When Form Is Submitted  
  onFormSubmit(form: NgForm) {
    console.log(form);
  }
  cancel(): void {
    this.dialogRef.close();
  }

}

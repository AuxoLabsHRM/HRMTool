import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatTabChangeEvent, MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDatepickerModule, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AlertPromise } from 'selenium-webdriver';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { QualificationService } from './../../_services/qualification.service';

export interface Language {
  id: string;
  name: string;
}
@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {
  userId: any = JSON.parse(localStorage.getItem('currentUser'))._id;
  languageForm: FormGroup;
  public dataoflanguage: any;
  public isAction: any;
  public issaveAction: any;
  language: string = '';
  reading: boolean;
  speaking: boolean;
  writing: boolean;
  languages: Language[] = [
    { id: '0', name: 'Tamil' },
    { id: '1', name: 'English' },
    { id: '2', name: 'French' }
  ];
  constructor(
    private formbuilder: FormBuilder,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<LanguagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private qualificationservice: QualificationService,
    private snackBar: MatSnackBar
  ) {
    this.languageForm = formbuilder.group({
      'language': [null, Validators.required],
      'reading': [null],
      'speaking': [null],
      'writing': [null],
      // 'understanding': [null]
    });
  }

  ngOnInit() {
    this.dataoflanguage = this.data;
    this.isAction = this.data.issaveAction;
    if (this.isAction != "SAVE") {
      this.languageForm.patchValue(this.dataoflanguage.data);
      this.languageForm.controls.language.patchValue(this.dataoflanguage.data.language.id)
    }
    console.log(this.languageForm)

  }

  cancelLanguage() {
    this.dialogRef.close();
  }

  createupdatelanguage() {
    let saveobj = {};
    saveobj['userId'] = this.userId;
    saveobj['reading'] = this.languageForm.controls.reading.value;
    saveobj['speaking'] = this.languageForm.controls.speaking.value;
    saveobj['writing'] = this.languageForm.controls.writing.value;

    let selectedLanguageID = this.languageForm.controls.language.value;
    let resultofLanguage = this.languages.filter(function (data) {
      return data.id == selectedLanguageID
    })
    saveobj['language'] = (resultofLanguage) ? resultofLanguage[0] : {}
    if (this.isAction == 'SAVE') {
      if(this.languageForm.valid){
      this.qualificationservice.createlanguage(JSON.stringify(saveobj)).subscribe((response) => {
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
      this.qualificationservice.updatelanguage(this.dataoflanguage.data._id, saveobj).subscribe((response) => {
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


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { qualification } from './qualifications';
import { AddSkillComponent } from '../add-skill/add-skill.component';
import { AddEducationdtlComponent } from '../add-educationdtl/add-educationdtl.component';
import { SkillDetails, Educationdtl, Languagedtl } from './../../interfaces/details-interface';
import { DataSource } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule } from '@angular/forms';
import { LanguagesComponent } from '../languages/languages.component';
import { QualificationService } from './../../_services/qualification.service';
import { AlertComponents } from '../../alert/alert.component';
export interface ExampleTab {
  label: string;
  content: string;
}

export interface UserData {
  id: number;
  skill: string;
  detail: string;
}
export interface PeriodicElement {
  position: number;
  qualification: string;
  institute: string;
  startdate: string;
  completedon: string;
}

export interface Language_data {
  language: string;
  reading: boolean;
  speaking: boolean;
  writing: boolean;
}


@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.css']
})
export class QualificationsComponent implements OnInit {

  userId: any = JSON.parse(localStorage.getItem('currentUser'))._id;
  displayedColumns1: string[] = ['qualification', 'institute', 'startdate', 'completedon', 'customColumn2'];
  dataSource1 = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  dataSource = new MatTableDataSource();
  displayedColumns = ['skill', 'detail', 'customColumn1'];

  displayedColumns2: string[] = ['language', 'reading', 'speaking', 'writing', 'customColumn3'];
  dataSource3 = new MatTableDataSource()

  asyncTabs: Observable<ExampleTab[]>;

  public isAction: string;
  public skilldetails: any = {
  };
  public Educationdtl: any = {};
  public element: any = {};
  public Languagedtls: any = {};
  constructor(
    private router: Router,
    private qualificationservice: QualificationService,
    private dialog: MatDialog,
  ) {

  }



  ngAfterViewInit() {

    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
    console.log(this.sort);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    this.dataSource3.filter = filterValue;
  }

  ngOnInit() {
    this.getskillDetails(this.userId);
    this.geteducationDetails(this.userId);
    this.getlanguageDtl(this.userId);
  }

  addskill() {
    this.qualificationservice.isDialogOpen.emit(true);
    const dialogRef = this.dialog.open(AddSkillComponent, {
      backdropClass: 'blureffect',
      panelClass: 'popup',
      disableClose: true,
      data: {
        issaveAction: 'SAVE'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getskillDetails(this.userId);
    });
  }

  // Add language
  addlanguage() {
    this.qualificationservice.isDialogOpen.emit(true);
    const dialogRef = this.dialog.open(LanguagesComponent, {
      backdropClass: 'blureffect',
      panelClass: 'popup',
      disableClose: true,
      data: {
        issaveAction: 'SAVE'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getlanguageDtl(this.userId);
    });
  }



  // Edit Skill
  editskill(skilldetails) {
    this.qualificationservice.isDialogOpen.emit(true);
    const dialogRef = this.dialog.open(AddSkillComponent, {
      backdropClass: 'blureffect',
      panelClass: 'popup',
      disableClose: true,
      data: {
        data: skilldetails,
        issaveAction: 'UPDATE'
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed', res);
      this.getskillDetails(this.userId);
    });
  }

  // Add Language
  addeducationdtl() {
    this.qualificationservice.isDialogOpen.emit(true);
    const dialogRef = this.dialog.open(AddEducationdtlComponent, {
      backdropClass: 'blureffect',
      panelClass: 'popup',
      disableClose: true,
      data: {
        issaveAction: 'SAVE'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.geteducationDetails(this.userId);
    });
  }

  // Edit Education
  editeducation(element) {
    this.qualificationservice.isDialogOpen.emit(true);
    const dialogRef = this.dialog.open(AddEducationdtlComponent, {
      backdropClass: 'blureffect',
      panelClass: 'popup',
      disableClose: true,
      data: {
        data: element,
        issaveAction: 'UPDATE'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.geteducationDetails(this.userId);
    });
  }

  // Edit Language
  editlanguage(languageelement) {
    this.qualificationservice.isDialogOpen.emit(true);
    const dialogRef = this.dialog.open(LanguagesComponent, {
      backdropClass: 'blureffect',
      panelClass: 'popup',
      disableClose: true,
      data: {
        data: languageelement,
        issaveAction: 'UPDATE'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed', res);
      this.getlanguageDtl(this.userId);
    });
  }

  // Get Skill details
  getskillDetails(id) {
    this.qualificationservice.getskilldetails(id).subscribe((res: any) => {
      this.dataSource.data = res.data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // Get Education details
  geteducationDetails(id) {
    this.qualificationservice.geteducationdetails(id).subscribe((res: any) => {
      this.dataSource1.data = res.data;
      this.dataSource1.paginator = this.paginator;
      this.dataSource1.sort = this.sort;
    })
  }

  // Get Language
  getlanguageDtl(id) {
    this.qualificationservice.getlanguageDtl(id).subscribe((res: any) => {
      this.dataSource3.data = res.data;
      this.dataSource3.paginator = this.paginator;
      this.dataSource3.sort = this.sort;
    })
  }

  // Delete Skill
  deleteskill(id) {
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
        this.qualificationservice.deleteskill(id).subscribe((res: any) => {
          this.getskillDetails(this.userId);
        });
      }
    });
  }

  // Delete education
  deleteeducation(id) {
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
        this.qualificationservice.deleteeducation(id).subscribe((res: any) => {
          this.geteducationDetails(this.userId);
        });
      }
    });
  }

  // Delete Language
  deletelanguage(id) {
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
        this.qualificationservice.deleteLanguage(id).subscribe((res: any) => {
          this.getlanguageDtl(this.userId);
        });
      }
    });
  }

}


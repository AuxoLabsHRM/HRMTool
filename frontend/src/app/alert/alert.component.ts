import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponents implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlertComponents>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  // On Click Close
  onClickClose() {
    this.dialogRef.close();
  }

  // On Click Okay
  onClickOk() {
    this.dialogRef.close(true);
  }

}

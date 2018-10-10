import { Component, OnInit } from '@angular/core';
import { EmergencyService } from './../../_services/emergency.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-edit-update-emergency',
  templateUrl: './edit-update-emergency.component.html',
  styleUrls: ['./edit-update-emergency.component.scss']
})
export class EditUpdateEmergencyComponent implements OnInit {
  
  public users : any = {};
  id;
  button;

  constructor(private snackBar: MatSnackBar, private _listService : EmergencyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if (this.id != "null") {
        this.button = "Update";
        this.getContactById(this.id);
      } else {
        this.button = "Add";
      }
      
    });
  }

  getContactById(id) {
    this._listService.getContact(id).subscribe(
      (res) => {
      console.log('data', res);
      if (res.ResultTye == 1) {
        this.snackBar.open(res.Message, '', {
          duration: 2000
        });
        this.users = res.data;
      } else {
        this.snackBar.open(res.Message, '', {
          duration: 2000
        });
      }
     }, (error) => {
      this.snackBar.open(error, '', {
        duration: 2000
      });
     });
  }

  addUpdateContact(){
    if (this.id == "null") {
      this.users.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
      this._listService.addContact(this.users).subscribe(res => {
        console.log('data', res);
        if (res.ResultTye == 1) {
          this.snackBar.open(res.Message, '', {
            duration: 2000
          });
          this.router.navigate(['emergency_contact']);
        } else {
          this.snackBar.open(res.Message, '', {
            duration: 2000
          });
        }
       }, (error) => {
        this.snackBar.open(error, '', {
          duration: 2000
        });
       });
    } else {
      this._listService.updateContact(this.id, this.users).subscribe(res => {
        console.log('data', res);
        if (res.ResultTye == 1) {
          this.snackBar.open(res.Message, '', {
            duration: 2000
          });
          this.router.navigate(['emergency_contact']);
        } else {
          this.snackBar.open(res.Message, '', {
            duration: 2000
          });
        }
       }, (error) => {
        this.snackBar.open(error, '', {
          duration: 2000
        });
       });
    }
  }

  cancel() {
    this.router.navigate(['emergency_contact']); 
  }

}

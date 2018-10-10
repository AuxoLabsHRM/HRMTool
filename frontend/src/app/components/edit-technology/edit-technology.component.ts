import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  DoCheck,
  forwardRef,
  Inject
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TechnologyService } from '../../technology.service';
import { MatSnackBar } from '@angular/material';
import { MyTableComponent } from '../../my-table/my-table.component';

@Component({
  selector: 'app-edit-technology',
  templateUrl: './edit-technology.component.html',
  styleUrls: ['./edit-technology.component.css']
})
export class EditTechnologyComponent implements OnInit, DoCheck {
  techId: string;
  technology: any = {};
  updateForm: FormGroup;
  @Output()
  public refreshTechnologyService: EventEmitter<any> = new EventEmitter<any>();

  // tslint:disable-next-line:max-line-length
  constructor(
    private technologyService: TechnologyService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    // To access parent component from child component
    @Inject(forwardRef(() => MyTableComponent))
    private _parent: MyTableComponent
  ) {
    this.createForm();
  }

  // Creates reactive form when page gets loaded
  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      auther: [''],
      description: [''],
      established: [''],
      latestVersion: [''],
      docURL: ['']
    });
  }
  ngOnInit() {
    const currentURL = this.router.url;
    this.route.params.subscribe(params => {
      this.techId = params.techId;
      this.technologyService.getTechnologyById(this.techId).subscribe(res => {
        this.technology = res;
        this.updateForm.get('name').setValue(this.technology.name);
        this.updateForm.get('auther').setValue(this.technology.auther);
        this.updateForm
          .get('description')
          .setValue(this.technology.description);
        this.updateForm
          .get('established')
          .setValue(this.technology.established);
        this.updateForm
          .get('latestVersion')
          .setValue(this.technology.latestVersion);
        this.updateForm.get('docURL').setValue(this.technology.docURL);
      });
    });
  }

  ngDoCheck() {
    const currentURL = this.router.url;
    // console.log(currentURL, 'currentURL');
  }
  // convenience getter for easy access to form fields
  get updateTechCtrls() {
    return this.updateForm.controls;
  }
  updateTechnology() {
    // stop here if form is invalid
    if (this.updateForm.invalid) {
      return;
    }
    this.technologyService
      .updateTechnology(this.techId, this.updateForm.value)
      .subscribe(() => {
        this.snackBar.open('Technology updated successfully', 'OK', {
          duration: 3000
        });
        this._parent.fetchTechnologies();
        this.router.navigate(['../../'], { relativeTo: this.route });
      });
  }
}

import { Component, OnInit, forwardRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TechnologyService } from '../../technology.service';
import { MyTableComponent } from '../../my-table/my-table.component';

@Component({
  selector: 'app-add-technology',
  templateUrl: './add-technology.component.html',
  styleUrls: ['./add-technology.component.css']
})
export class AddTechnologyComponent implements OnInit {
  createForm: FormGroup;
  submited = false;
  constructor(
    private technologyService: TechnologyService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    // To access parent component from child component
    @Inject(forwardRef(() => MyTableComponent))
    private _parent: MyTableComponent
  ) {}

  addTechnlogy(name, auther, description, established, latestVersion, docURL) {
    // tslint:disable-next-line:radix
    this.submited = true;
    this.technologyService
      .addTechnology(
        name,
        auther,
        description,
        established,
        latestVersion,
        docURL
      )
      .subscribe(() => {
        this._parent.fetchTechnologies();
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

  ngOnInit() {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      auther: ['', Validators.required],
      description: ['', Validators.required],
      established: ['', Validators.required],
      latestVersion: ['', Validators.required],
      docURL: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get createTech() {
    return this.createForm.controls;
  }
}

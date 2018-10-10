import { Component, OnInit, ViewChild } from '@angular/core';
import { DataServiceService } from '../../data-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TechDetailsComponent } from '../tech-details/tech-details.component';
import { TestService } from '../../test.service';

@Component({
  selector: 'app-all-languages',
  templateUrl: './all-languages.component.html',
  styleUrls: ['./all-languages.component.css']
})
export class AllLanguagesComponent implements OnInit {
  public technologies;
  public errorMsg;
  selectedTech: number;
  childData: any;
  selectedTechnolgyId: number;
  // @ViewChild(TechDetailsComponent) private techDetail: TechDetailsComponent;
  constructor(
    private _techDetailService: DataServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private _testService: TestService
  ) {}

  ngOnInit() {
    this._techDetailService
      .getTechDetails()
      .subscribe(
        data => (this.technologies = data),
        error => (this.errorMsg = error)
      );
    console.log(this.technologies, '-- this.technologies');
    this.childData = this._testService.testData;
    this.selectedTechnolgyId = this._testService.selectedTechId;
  }

  onSelected(technology) {
    console.log('Hi i am from parent');
    // this.router.navigate(['/departments', technology.id]); // using obsolute path which is not the best way for flexible routing
    this.router.navigate([technology._id], { relativeTo: this.route }); // using relative path which is the best way for flexible routing
  }

  goToEditTechPage(technology) {
    console.log('Hi i am from parent');
    // this.router.navigate(['/departments', technology.id]); // using obsolute path which is not the best way for flexible routing
    this.router.navigate(['/edit-tech', technology._id], {
      relativeTo: this.route
    });
    // using relative path which is the best way for flexible routing
  }
}

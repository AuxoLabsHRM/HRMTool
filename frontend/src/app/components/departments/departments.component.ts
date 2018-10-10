import { Component, OnInit, ViewChild } from '@angular/core';
import { DataServiceService } from '../../data-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TechDetailsComponent } from '../tech-details/tech-details.component';
import { TestService } from '../../test.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
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

  onSelect(technology) {
    // this.router.navigate(['/departments', technology.id]); // using obsolute path which is not the best way for flexible routing
    this.router.navigate([technology._id], { relativeTo: this.route }); // using relative path which is the best way for flexible routing
  }
  test(data) {
    console.log(data, '---data');
  }
}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataServiceService } from '../../data-service.service';
import { TestService } from '../../test.service';

@Component({
  selector: 'app-tech-details',
  templateUrl: './tech-details.component.html',
  styleUrls: ['./tech-details.component.css']
})
export class TechDetailsComponent implements OnInit {
  departmentId: any;
  filteredData: any;
  technologies: any;
  test;
  showData = {
    isShowOverview: false,
    isShowContact: false
  };
  @Input() public techDetail: object;
  @Output() public techObj: EventEmitter<any> = new EventEmitter<any>();
  public errorMsg;

  constructor(
    private _techDetailService: DataServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService
  ) {}

  ngOnInit() {
    this._techDetailService
      .getTechDetails()
      .subscribe(
        data => (this.technologies = data),
        error => (this.errorMsg = error)
      );
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log(params.get('id'), '---params.ge');
      const id = params.get('id');
      this.departmentId = id;
      setTimeout(() => {
        this.filterData(id);
      }, 1000);

      this.testService.selectedTechId = id;
    });
  }

  filterData(departmentId) {
    this.technologies.filter(item => {
      if (item._id === departmentId) {
        this.filteredData = item;
        console.log(item, this.filteredData, '---item');
        return item;
      }
    });
  }
  techDetailOverview() {
    this.showData.isShowOverview = true;
    this.showData.isShowContact = false;
    this.router.navigate(['overview'], { relativeTo: this.route });
  }
  techDetailContact() {
    this.showData.isShowOverview = false;
    this.showData.isShowContact = true;
    this.router.navigate(['contact'], { relativeTo: this.route });
  }

  dataTransferToParent() {
    // this.techObj.emit(this.filteredData);
    this.testService.testData = this.filteredData;
    // this.router.navigate(['/departments', { id: this.departmentId }]);  // With optional Routing Parameters and absolute path
    this.router.navigate(['/departments']); // Without optional Routing Parametersand absolute path

    // this.router.navigate(['../', { id: this.dataTransferToParent }], {
    //   relativeTo: this.route
    // });                                                  // With optional Routing Parameters and relative path

    this.router.navigate(['../'], {
      // '../' for move backe after one slash(/) in the URL
      relativeTo: this.route
    }); // Without optional Routing Parameters and relative path
  }
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tech-detail-overview',
  templateUrl: './tech-detail-overview.component.html',
  styleUrls: ['./tech-detail-overview.component.css']
})
export class TechDetailOverviewComponent implements OnInit {
  @Input() public show: any;
  @Input() public Data: any;

  constructor() {}

  ngOnInit() {
    console.log(this.Data, '--Data');
  }
}

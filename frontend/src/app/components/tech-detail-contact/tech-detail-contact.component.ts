import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tech-detail-contact',
  templateUrl: './tech-detail-contact.component.html',
  styleUrls: ['./tech-detail-contact.component.css']
})
export class TechDetailContactComponent implements OnInit {
  @Input() public show: any;
  @Input() public Data: any;
  constructor() {}

  ngOnInit() {
    console.log(this.Data, this.show, '---Dataaaa');
  }
}

import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MyTableDataSource, ExampleDatabase } from './my-table-datasource';
import { DataServiceService } from '../data-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TechDetailsComponent } from '../components/tech-details/tech-details.component';
import { TestService } from '../test.service';
@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = [
    'name',
    'auther',
    'description',
    'established',
    'latestVersion',
    'docURL'
  ];
  _ExampleDatabase = new ExampleDatabase();
  selectedTech: any;
  dataSource: MyTableDataSource;
  test;
  DataSource;
  selectedTechnolgyId;
  @Input() public show: any;
  // @Output() someEvent: EventEmitter = new EventEmitter<any>();
  @Output() public someEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private _techDetailService: DataServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this._techDetailService.getTechDetails().subscribe(
      data => this._ExampleDatabase.loadData(data),
      // data => {
      //   this.dataSource = new MyTableDataSource(
      //     this.paginator,
      //     this.sort,
      //     this._techDetailService
      //   );
      // }
      error => (this.test = error)
    );
  }

  onSelect(object) {
    this.someEvent.emit(object);
  }

  ngOnInit() {
    this.dataSource = new MyTableDataSource(
      this.paginator,
      this.sort,
      this._techDetailService
    );
    console.log(this.dataSource, '--- this.dataSource');
  }
}

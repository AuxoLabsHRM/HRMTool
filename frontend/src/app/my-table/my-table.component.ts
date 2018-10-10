import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  DoCheck,
  forwardRef
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MyTableDataSource, ExampleDatabase } from './my-table-datasource';
import { DataServiceService } from '../data-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TechDetailsComponent } from '../components/tech-details/tech-details.component';
import { TestService } from '../test.service';
import { TechDetail } from '../interfaces/details-interface';
import { TechnologyService } from '../technology.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit, DoCheck {
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = [
    'name',
    'auther',
    'description',
    'established',
    'latestVersion',
    'docURL',
    'actions'
  ];
  techId;
  selectedTech;
  selectedTechnolgyId;
  errorMsg;
  isParent = true;
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort)
  set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator)
  set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  @Input() public show: any;
  dataSource = new MatTableDataSource<TechDetail>(ELEMENT_DATA);

  // @Output() someEvent: EventEmitter = new EventEmitter<any>();
  @Output() public someEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private _technologyService: TechnologyService,
    private router: Router,
    private route: ActivatedRoute,
    private _testService: TestService,
    private snackBar: MatSnackBar
  ) {
    this.fetchTechnologies();
    this.selectedTech = this._testService.selectedTechId;
    console.log('hii I am parent'); // array of states
    console.log(console.log(window.location.href));
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.techId = params.techId;
    });
  }

  ngDoCheck() {
    const currentURL1 = this.router.url;
    if (this.router.url === '/all-technologies') {
      this.isParent = true;
    } else if ('/all-technologies/add-tech') {
      this.isParent = false;
    }
  }

  fetchTechnologies() {
    this._technologyService.getTechnologies().subscribe(data => {
      ELEMENT_DATA = data;
      this.dataSource = new MatTableDataSource<TechDetail>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => (this.errorMsg = error));
  }

  deleteTechnology(technologyObj) {
    this._technologyService
      .deleteTechnology(technologyObj._id)
      .subscribe(() => {
        this.snackBar.open('Technology Deleted successfully', 'OK', {
          duration: 3000
        });
        this.fetchTechnologies();
      });
  }

  onSelect(object) {
    this.someEvent.emit(object);
  }

  editTechnology(technologyObj) {
    this.isParent = false;
    this.router.navigate(['edit-tech', technologyObj._id], {
      relativeTo: this.route
    });
  }

  createTechnology() {
    this.isParent = false;
    this.router.navigate(['add-tech'], { relativeTo: this.route });
  }
}
let ELEMENT_DATA: TechDetail[] = [];

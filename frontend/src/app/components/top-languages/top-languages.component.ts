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
import * as _ from 'lodash';
import { DataServiceService } from '../../data-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TechDetailsComponent } from '../tech-details/tech-details.component';
import { TechnologyService } from '../../technology.service';
import { TechDetail } from '../../interfaces/details-interface';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-top-languages',
  templateUrl: './top-languages.component.html',
  styleUrls: ['./top-languages.component.css']
})
export class TopLanguagesComponent implements OnInit {
  private paginator: MatPaginator;
  private sort: MatSort;
  topTenTechnologies: TechDetail[] = [];
  // dataSource = new MatTableDataSource<TechDetail>(ELEMENT_DATA);
  errorMsg;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = [
    'name',
    'auther',
    'description',
    'established',
    'latestVersion',
    'docURL'
  ];
  tile = { text: 'One', cols: 1, rows: 1, color: 'lightblue' };
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

  constructor(
    private _technologyService: TechnologyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchTechnologies();
    console.log(_.chunk(['a', 'b', 'c', 'd'], 2), '----loadash');
  }
  setDataSourceAttributes() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  fetchTechnologies() {
    this._technologyService.getTechnologies().subscribe(data => {
      this.topTenTechnologies = data;
      // this.dataSource = new MatTableDataSource<TechDetail>(data);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    }, error => (this.errorMsg = error));
  }
}
// let ELEMENT_DATA: TechDetail[] = [];

import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { TestService } from '../test.service';
import { DataServiceService } from '../data-service.service';
import { TechDetail } from '../interfaces/details-interface';
import { BehaviorSubject } from 'rxjs';
let dataArray = [];
export class ExampleDatabase {
  constructor() {
    this.returnDatas().subscribe(datas => {
      dataArray = datas;
      console.log(dataArray, '----1111');
    });
  }
  dataChange: BehaviorSubject<TechDetail[]> = new BehaviorSubject<TechDetail[]>(
    []
  );
  get data(): TechDetail[] {
    return this.dataChange.value;
  }

  loadData(data) {
    this.dataChange.next(data);
  }

  returnDatas(): Observable<any> {
    return this.dataChange.asObservable();
  }
}
export class MyTableDataSource extends DataSource<TechDetail>
  implements OnInit {
  data: TechDetail[] = dataArray;

  constructor(
    private paginator: MatPaginator,
    private sort: MatSort,
    private _techDetailService: DataServiceService
  ) {
    super();
    this._techDetailService
      .getTechDetails()
      .subscribe(data => (this.data = data), error => (this.data = error));
  }

  ngOnInit() {}

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TechDetail[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TechDetail[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TechDetail[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'auther':
          return compare(+a.auther, +b.auther, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

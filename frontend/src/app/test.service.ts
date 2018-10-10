import { Injectable, EventEmitter } from '@angular/core';
import {
  throwError as observableThrowError,
  Observable,
  Subject,
  BehaviorSubject
} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TechDetail } from './interfaces/details-interface';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  //   public eventEmitter: EventEmitter<any> = new EventEmitter<any>();

  public testData;
  public selectedTechId: any;
  // public isLoggedInValu: any;
  private subject = new BehaviorSubject<any>(
    localStorage.getItem('isLoggedIn')
  );
  isLoggedInValu$ = this.subject.asObservable();
  // constructor(private http: HttpClient); {}
  getSub() {
    //  return this.isLoggedInValu$;
    return this.subject.next(localStorage.getItem('isLoggedIn'));
  }
}

import { Injectable } from '@angular/core';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TechDetail } from './interfaces/details-interface';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private _url = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getTechDetails(): Observable<TechDetail[]> {
    return this.http.get<TechDetail[]>(`${this._url}/technologies`).pipe(
      tap(),
      catchError(this.errorHandler)
    );
  }
  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server Error');
  }
}

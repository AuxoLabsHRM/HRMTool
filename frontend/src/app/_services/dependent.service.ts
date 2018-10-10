import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DependentService {
  // private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  // this.options

  constructor(private http : HttpClient) { }
    
    getAllDependent(userId): Observable<any> {
      return this.http.get(`${environment.apiUrl}/api/dependent/` + userId).pipe(
        catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse){
      // return observableThrowError(error.message || "Server Error");
      return throwError(error || "Server Error");
    }

    getDependent(id): Observable<any> {
      return this.http.get(`${environment.apiUrl}/api/dependent/dep/` + id).pipe(
        catchError(this.errorHandler));
    }

    deleteDependent(id): Observable<any> {
      return this.http.delete(`${environment.apiUrl}/api/dependent/` + id).pipe(
        catchError(this.errorHandler));
    }

    addDependent(dependent: any): Observable<any> {
      return this.http.post(`${environment.apiUrl}/api/dependent`, JSON.parse(dependent)).pipe(
        catchError(this.errorHandler));
    }

    updateDependent(id, dependent: any): Observable<any> {
      return this.http.put(`${environment.apiUrl}/api/dependent/` + id, dependent).pipe(
        catchError(this.errorHandler));
    }
}

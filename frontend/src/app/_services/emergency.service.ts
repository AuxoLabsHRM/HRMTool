import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {
  constructor(private http : HttpClient) { }
    
    getAllContact(userId): Observable<any> {
      return this.http.get(`${environment.apiUrl}/api/emergency/` + userId).pipe(
        catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse){
      // return observableThrowError(error.message || "Server Error");
      return throwError(error || "Server Error");
    }

    getContact(id): Observable<any> {
      return this.http.get(`${environment.apiUrl}/api/emergency/contact/` + id).pipe(
        catchError(this.errorHandler));
    }

    deleteContact(id): Observable<any> {
      return this.http.delete(`${environment.apiUrl}/api/emergency/` + id).pipe(
        catchError(this.errorHandler));
    }

    addContact(contact: any): Observable<any> {
      return this.http.post(`${environment.apiUrl}/api/emergency`, contact).pipe(
        catchError(this.errorHandler));
    }

    updateContact(id, contact: any): Observable<any> {
      return this.http.put(`${environment.apiUrl}/api/emergency/` + id, contact).pipe(
        catchError(this.errorHandler));
    }
}

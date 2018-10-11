import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SkillDetails } from '../interfaces/details-interface';

@Injectable({
  providedIn: 'root'
})

export class QualificationService {
  public isDialogOpen: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

   // Skills //

  // Get single skill
  getskillItems(id: any) {
    return this.http.get(`${environment.apiUrl}/api/skill/skills/` + id);
  }

  // Create skill
  createskill(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/skill`, JSON.parse(data)).pipe(catchError(this.handleError));
  }

  // Get skills
  getskilldetails(id: any): Observable<SkillDetails[]>{
    return this.http.get<SkillDetails[]>(`${environment.apiUrl}/api/skill/` + id).pipe(catchError(this.handleError));
  }

  // Update skill
  updateskillitem(id: any, dataColl): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/skill/` + id, dataColl).pipe(catchError(this.handleError));
  }

  // Delete Skill
  deleteskill(id: any){
    return this.http.delete(`${environment.apiUrl}/api/skill/` + id).pipe(catchError(this.handleError));
  }

  // Education //

  // Get Educations
  geteducationdetails(id: any){
    return this.http.get(`${environment.apiUrl}/api/education/` + id).pipe(catchError(this.handleError));
  }

  // create education
  createeducation(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/education`, JSON.parse(data)).pipe(catchError(this.handleError));
  }

  // Update Education 
  updateeducationitem(id: any, dataofeducation): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/education/` + id, JSON.parse(dataofeducation)).pipe(catchError(this.handleError));
  }

  // Delete Education
  deleteeducation(id: any){
    return this.http.delete(`${environment.apiUrl}/api/education/` + id).pipe(catchError(this.handleError));
  }

   // Language //
  
   // Create Language
    createlanguage(data): Observable<any> {
      return this.http.post(`${environment.apiUrl}/api/language`, JSON.parse(data)).pipe(catchError(this.handleError));
    }
 
    // Update Language
    updatelanguage(id: any, dataoflanguage): Observable<any> {
      return this.http.put(`${environment.apiUrl}/api/language/` + id, dataoflanguage).pipe(catchError(this.handleError));
    }

    // Get Languages
    getlanguageDtl(id: any){
      return this.http.get(`${environment.apiUrl}/api/language/` + id).pipe(catchError(this.handleError));
    }

    // Delete Language
    deleteLanguage(id: any){
      return this.http.delete(`${environment.apiUrl}/api/language/` + id).pipe(catchError(this.handleError));
    }    
  // Leave Management

  // Get leave details
  getleavedtl(id: any){
    return this.http.get(`${environment.apiUrl}/api/applyleave/`+ id).pipe(catchError(this.handleError));
  }
   
  // Apply leave
   applyleave(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/applyleave`, JSON.parse(data)).pipe(catchError(this.handleError));
  }

  // Get leavereqlist
    getleavereqlist(id: any){
      return this.http.get(`${environment.apiUrl}/api/applyleave/` + id).pipe(catchError(this.handleError));
    }

  // Handle Error
  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: `, error.error);
    }
    return throwError(error.error);
  }
}

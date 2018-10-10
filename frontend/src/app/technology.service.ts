import { Injectable } from '@angular/core';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TechDetail } from './interfaces/details-interface';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getTechnologies(): Observable<TechDetail[]> {
    return this.http.get<TechDetail[]>(`${this.uri}/technologies`).pipe(
      tap(),
      catchError(this.errorHandler)
    );
  }

  getTechnologyById(id) {
    return this.http.get(`${this.uri}/technologies/${id}`);
  }

  addTechnology(name, auther, description, established, latestVersion, docURL) {
    const techObj = {
      name: name,
      auther: auther,
      description: description,
      established: established,
      latestVersion: latestVersion,
      docURL: docURL
    };
    return this.http.post(`${this.uri}/technologies/add`, techObj);
  }

  updateTechnology(id, object) {
    const techObj = {
      name: object.name,
      auther: object.auther,
      description: object.description,
      established: object.established,
      latestVersion: object.latestVersion,
      docURL: object.docURL
    };
    return this.http.post(`${this.uri}/technologies/update/${id}`, techObj);
  }

  deleteTechnology(id) {
    return this.http.delete(`${this.uri}/technologies/delete/${id}`);
  }
  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server Error');
  }
}

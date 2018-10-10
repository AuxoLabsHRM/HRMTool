import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${environment.apiUrl}/users`);
  }

  getMe(token) {
    let headers = new HttpHeaders();
    headers = headers.append('x-access-token', token);

    // headers  = headers.append('header-2', 'value-2');
    //  let params = new HttpParams();
    //  params = params.append('param-1', 'value-1');
    //  params = params.append('param-2', 'value-2');

    //  this.httpClient.get("/data", {headers , params })

    return this.http.get(`${environment.apiUrl}/api/auth/me`, { headers });
  }

  getById(id: number) {
    return this.http.get(`${environment.apiUrl}/users/` + id);
  }

  // login(email, password) {
  //   this.http.post<any>(`${environment.apiUrl}/api/auth/login`, {
  //     email: email,
  //     password: password
  //   });
  // }

  register(user) {
    return this.http.post(`${environment.apiUrl}/api/auth/register`, user);
  }

  update(user) {
    return this.http.put(`${environment.apiUrl}/users/` + user.id, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/` + id);
  }
}

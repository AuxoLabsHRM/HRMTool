import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getDashboards() {
    return this.http.get(`${environment.apiUrl}/api/dashboard`);
  }

  getDaahboardById(id: number) {
    return this.http.get(`${environment.apiUrl}/api/dashboard` + id);
  }

  createDashboard(data) {
    return this.http.post(`${environment.apiUrl}/api/dashboard`, data);
  }

  updateDashboard(data) {
    return this.http.put(`${environment.apiUrl}/api/dashboard` + data.id, data);
  }

  deleteDashboard(id: number) {
    return this.http.delete(`${environment.apiUrl}/api/dashboard` + id);
  }
}

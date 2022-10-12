import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrganizacion } from '../models/organizacion';

const baseUrl = 'http://localhost:5000/api/organizacion';

@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<IOrganizacion[]> {
    return this.http.get<IOrganizacion[]>(baseUrl);
  }

  get(id): Observable<IOrganizacion> {
    return this.http.get<IOrganizacion>(`${baseUrl}/${id}`);
  }

  create(data): Observable<void> {
    return this.http.post<void>(baseUrl, data);
  }

  update(id, data): Observable<void> {
    return this.http.put<void>(`${baseUrl}/${id}`, data);
  }

  delete(id): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/${id}`);
  }
}

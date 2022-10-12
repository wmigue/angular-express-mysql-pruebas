import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDonacion } from '../models/donacion';

const baseUrl = 'http://localhost:5000/api/donacion';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<IDonacion[]> {
    return this.http.get<IDonacion[]>(baseUrl);
  }

  get(id): Observable<IDonacion> {
    return this.http.get<IDonacion>(`${baseUrl}/${id}`);
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

  donacionesRecibidas(): Observable<number> {
    return this.http.get<number>(`${baseUrl}/donacion/totales`);
  }
  donacionesMasGrande(): Observable<IDonacion> {
    return this.http.get<IDonacion>(`${baseUrl}/donacionMasGrande`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDonacionSolicitudItem } from '../models/donacionSolicitudItem';

const baseUrl = 'http://localhost:5000/api/donacionSolicitudItem';

@Injectable({
  providedIn: 'root'
})
export class DonacionSolicitudItemService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<IDonacionSolicitudItem[]> {
    return this.http.get<IDonacionSolicitudItem[]>(baseUrl);
  }

  get(id): Observable<IDonacionSolicitudItem> {
    return this.http.get<IDonacionSolicitudItem>(`${baseUrl}/${id}`);
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

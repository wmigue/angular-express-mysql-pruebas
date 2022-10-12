import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEstado } from '../models/estado';

const baseUrl = 'http://localhost:5000/api/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<IEstado[]> {
    return this.http.get<IEstado[]>(baseUrl);
  }

  get(id): Observable<IEstado> {
    return this.http.get<IEstado>(`${baseUrl}/${id}`);
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

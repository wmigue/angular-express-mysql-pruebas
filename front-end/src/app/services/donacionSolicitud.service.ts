import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDonacionSolicitud } from '../models/donacionSolicitud';

const baseUrl = 'http://localhost:5000/api/donacionSolicitud';

@Injectable({
  providedIn: 'root'
})
export class DonacionSolicitudService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<IDonacionSolicitud[]> {
    return this.http.get<IDonacionSolicitud[]>(baseUrl);
  }

  get(id): Observable<IDonacionSolicitud> {
    return this.http.get<IDonacionSolicitud>(`${baseUrl}/${id}`);
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

  finalizarSolicitud(id):Observable<void>{
    return this.http.put<void>(`${baseUrl}/finalizarSolicitud/${id}`,null);
  }

  donacionesSolicitudTotales():Observable<number>{
    return this.http.get<number>(`${baseUrl}/cantidadSolicitudes`);
  }

  donacionesSolicitudFinalizadas():Observable<number>{
    return this.http.get<number>(`${baseUrl}/solicitudes/finalizadas`);
  }
}

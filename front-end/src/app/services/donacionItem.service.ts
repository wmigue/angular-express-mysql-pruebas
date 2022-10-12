import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDonacionItem } from '../models/donacionItem';

const baseUrl = 'http://localhost:5000/api/donacionItem';

@Injectable({
  providedIn: 'root'
})
export class DonacionItemService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<IDonacionItem[]> {
    return this.http.get<IDonacionItem[]>(baseUrl);
  }

  get(id): Observable<IDonacionItem> {
    return this.http.get<IDonacionItem>(`${baseUrl}/${id}`);
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

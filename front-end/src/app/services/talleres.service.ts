import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Taller } from '../models/taller';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TalleresService {

  API_URI = 'http://localhost:3003/api/talleres';

  constructor(private http: HttpClient) { }

  getLista() {
    return this.http.get(`${this.API_URI}/`);
  }
  getUno(nombre: string) {
    return this.http.post(`${this.API_URI}/`,{nombre});
  }

}

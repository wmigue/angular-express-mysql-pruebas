import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Taller } from '../models/taller';
import { Observable } from 'rxjs';
import { DonacionAnonima } from '../models/donacionAnonima';

@Injectable({
  providedIn: 'root'
})
export class AnonimoService {

  API_URI = 'http://localhost:3003/api/anonimos';

  constructor(private http: HttpClient) { }

  getAnonimos() {
    return this.http.get(`${this.API_URI}/`);
  }
  donarAnonimo(donacion: DonacionAnonima) {
    return this.http.post(`${this.API_URI}/`, donacion);
  }

}

export default AnonimoService
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  API_URI = 'http://localhost:3003/api';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.API_URI}/usuarios`);
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.post(`${this.API_URI}/usuarios`, usuario);
  }

  deleteOne(id: string) {
    return this.http.delete(`${this.API_URI}/usuarios/${id}`);
  }

  habilitarOne(id: string) {
    return this.http.post(`${this.API_URI}/usuarios/updateEstado/`,{id});
  }

  sigIn(pass: string, mail: string) {
    return this.http.post(`${this.API_URI}/usuarios/signin/`,{pass, mail});
  }

  miInfo() {
    return this.http.get(`${this.API_URI}/usuarios/miinfo/`);
  }

 




}

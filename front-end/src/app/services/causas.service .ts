import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Taller } from '../models/taller'
import { Observable } from 'rxjs'
import { DonacionAnonima } from '../models/donacionAnonima'
import { Causa } from '../models/causa'

@Injectable({
  providedIn: 'root'
})
export class CausasServices {

  API_URI = 'http://localhost:3003/api/causas'

  constructor(private http: HttpClient) { }

  getCausas() {
    return this.http.get(`${this.API_URI}/`)
  }

  getMisDonacionesRecibidas(id: number) {
    return this.http.post(`${this.API_URI}/misdonaciones/`, { id })
  }

  addCausa(causa: Causa) {
    return this.http.post(`${this.API_URI}/`, causa)
  }

  changeStatus(id: number) {
    return this.http.post(`${this.API_URI}/aprobardesaprobar/`, {id})
  }

  rechazar(idArticuloARetornar: string, cantidad: string, idDonacionAEliminar: string) {
    return this.http.post(`${this.API_URI}/rechazar/`, {idArticuloARetornar, cantidad, idDonacionAEliminar})
  }

}

export default CausasServices
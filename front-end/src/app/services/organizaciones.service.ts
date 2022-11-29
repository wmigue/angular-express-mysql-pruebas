import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Taller } from '../models/taller'
import { Observable } from 'rxjs'
import { Organizacion } from '../models/organizacion'
import { environment } from 'src/environments/environment'
import { Articulo } from '../models/articulo'
import { OrgStock_Causa } from '../models/OrgStock_Causa'

@Injectable({
  providedIn: 'root'
})

export class OrganizacionesService {

  API_URI = 'http://localhost:3003/api/organizaciones'

  constructor(private http: HttpClient) { }

  listarTodas() {
    return this.http.get(`${this.API_URI}/`)
  }
  ListarUna(nombre: string) {
    return this.http.post(`${this.API_URI}/`, { nombre })
  }
  guardar(org: any) {
    const headers = new HttpHeaders()
    return this.http.post(`${this.API_URI}/`, org,
      { headers: headers.set('enctype', 'multipart/form-data') })
  }
  deleteOne(id: string) {
    return this.http.delete(`${this.API_URI}/${id}`)
  }

  habilitarOne(id: string) {
    return this.http.post(`${this.API_URI}/updateEstado/`, { id })
  }

  cambiarMail(nuevo: string, id: number) {
    return this.http.post(`${this.API_URI}/updatemail/`, { nuevo, id })
  }

  sigIn(pass: string, mail: string) {
    return this.http.post(`${this.API_URI}/signin/`, { pass, mail })
  }

  miInfo() {
    return this.http.get(`${this.API_URI}/miinfo/`)
  }

  //////////////////////////////////////////////////////////////////

  viewStock(id_org: number) {
    return this.http.post(`${this.API_URI}/viewStock`, { id_org })
  }

  saveInStock(articulo: Articulo) {
    return this.http.post(`${this.API_URI}/saveInStock`, articulo)
  }
  ////////////////////////////////////////////////////////////////////
  
  donar(objeto: OrgStock_Causa) {
    return this.http.post(`${this.API_URI}/donar`, objeto)
  }

  descontar(id:string , cantidad:number) {
    return this.http.post(`${this.API_URI}/descontar`, {id, cantidad})
  }

  listarDonacionesDeOrg() {
    return this.http.get(`${this.API_URI}/donacionesDeOrg/`)
  }

  misDonaciones(id: string){
    return this.http.post(`${this.API_URI}/MisDonaciones/`, {id})
  }
 

}

export default OrganizacionesService
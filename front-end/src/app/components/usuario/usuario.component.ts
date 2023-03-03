import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { Organizacion } from 'src/app/models/organizacion';
import { Usuario } from 'src/app/models/Usuario';
import { Causa } from 'src/app/models/causa'
import OrganizacionesService from 'src/app/services/organizaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ModalAddComponent } from '../modal-add/modal-add.component';
import CausasServices from 'src/app/services/causas.service ';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @HostBinding('class') classes = 'row'


  data: any
  data2: any
  modalswitch: boolean
  errores: Object = {
    addCausas: []
  }

  causa: Causa = {
    denominacion: '',
    pais: ''
  }

  passNuevo: string
  idAdmin: string = "63"

  constructor(private router: Router, private usuarioService: UsuariosService, private OrgService: OrganizacionesService, private organizacionesService: OrganizacionesService, private causasSrv: CausasServices, private parent: ModalAddComponent, private parent2: ModalAddComponent) {

  }

  ngOnInit() {
    this.getUsuarios()
  }


  getUsuarios() {
    this.usuarioService.getAll()
      .subscribe(
        res => {
          this.data = res
          console.log(res)
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/errores', 'no tienes el rol de ADMIN para ver la ruta que pretendes acceder.']) // si no tiene el rol admin, navega a errores
            }
          }
        }
      )
  }


  deleteUsuario(id: string) {
    this.usuarioService.deleteOne(id)
      .subscribe(
        res => {
          console.log(res)
          this.getUsuarios()
        },
        err => console.error(err)
      )
  }

  habilitarUsuario(id: string) {
    this.usuarioService.habilitarOne(id)
      .subscribe(
        res => {
          this.getUsuarios()
        },
        err => console.error(err)
      )
  }

  deleteOrg(id: string) {
    this.OrgService.deleteOne(id)
      .subscribe(
        res => {
          console.log(res)
          this.getUsuarios()
        },
        err => console.error(err)
      )
  }

  habilitarOrg(id: string) {
    this.OrgService.habilitarOne(id)
      .subscribe(
        res => {
          this.getUsuarios()
        },
        err => console.error(err)
      )
  }




  abrirModal() {
    this.modalswitch = !this.modalswitch
    console.log(this.modalswitch)
  }



  openModalWithParams(contenido, id_causa): void {
    this.causa.denominacion = ''
    this.causa.pais = ''
    this.parent.openCentrado(contenido)
    if (id_causa !== undefined) {
      this.causasSrv.getMisDonacionesRecibidas(id_causa)
        .subscribe(x =>
          this.data2 = x
        ),
        err => console.log(err)
    }
  }








  guardarCausa(cau: Causa): void {
    this.causasSrv.addCausa(cau)
      .subscribe(x => {
        this.getUsuarios()
        this.parent.modal.dismissAll()
        console.log(x)
      }, err => {
        this.errores['addCausas'] = err.error.errors
        //console.log(this.errores['addCausas'])
      }
      )
  }


  cambiarEstado(id: number, cid): void {
    this.causasSrv.changeStatus(id)
      .subscribe(x => {
        console.log(x)
        this.getUsuarios()
        this.causasSrv.getMisDonacionesRecibidas(cid)
          .subscribe(x =>
            this.data2 = x
          )

      }, err => console.log(err)
      )
  }



  rechazarDonacion(idArticuloARetornar, cantidad, idDonacionAEliminar, cid): void {
    this.causasSrv.rechazar(idArticuloARetornar, cantidad, idDonacionAEliminar)
      .subscribe(x => {
        console.log(x)
        this.getUsuarios()
        this.causasSrv.getMisDonacionesRecibidas(cid)
          .subscribe(x =>
            this.data2 = x
          )
      }, err => console.log(err)
      )
  }





  openModalPass(contenido) {
    this.parent2.openCentrado(contenido)
  }


  changePass(passNuevo, idadmin) {
    this.usuarioService.updateAdmin(idadmin, passNuevo)
      .subscribe(x => {
        console.log(x),
          err => console.log(err)
        this.parent2.modal.dismissAll()
      }
      )
  }





}

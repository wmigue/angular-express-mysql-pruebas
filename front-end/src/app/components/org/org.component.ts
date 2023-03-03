import { HttpErrorResponse } from '@angular/common/http'
import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import OrganizacionesService from 'src/app/services/organizaciones.service'
import { ModalAddComponent } from '../modal-add/modal-add.component'
import { Articulo } from 'src/app/models/articulo'
import CausasServices from 'src/app/services/causas.service '
import { OrgStock_Causa } from 'src/app/models/OrgStock_Causa'


@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.css']
})


export class OrgComponent implements OnInit {


  dataStock: any
  dataOrg: any
  id_org: any = null

  res: any = ''
  errores: Object = { msg: '', param: '' }

  initialValues = {
    id_organizacion: 0,
    articulo: '',
    cantidad: null,
  }

  articulo: Articulo = {
    id_organizacion: 0,
    articulo: '',
    cantidad: null,
  }

  OrgStock_Causa: OrgStock_Causa = {
    id_orgstock: 0,
    id_causas: 0,
    cantidad: 0,
    fecha: new Date()
  }



  passNuevo: string = ''

  causas: any

  id_causa_seleccionada: number = 0
  articulo_id: number = 0
  cantidad_de_ese_articulo: number = 0

  sedono: boolean = false
  errordonacion: boolean = false

  misdonaciones: any

  constructor(private orgService: OrganizacionesService, private router: Router, private route: ActivatedRoute, private parent: ModalAddComponent, private causasSrv: CausasServices) { }

  ngOnInit() {

    /*  
     //traigo del parametro de la url el id de la org. (no lo uso por ahora, solo ejemplo.)
     this.route.params
       .subscribe((params: Params) => {
         this.id_org = params['id']
       })
   */
    this.getCausas()
    this.orgService.miInfo()
      .subscribe(res => {
        this.dataOrg = res
        this.id_org = this.dataOrg.usuario[0].id
        this.verStockArticulos(this.id_org)
        this.getMisDonaciones(this.id_org)
      }, err => { //error que viene de isAuthenticated middleware cuando no hay token.
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']) // si expira el token , me envia al login. (60 seg.)
          }
        }
      }
      )
  }




  verStockArticulos(idOrganizacion: number) {
    this.orgService.viewStock(idOrganizacion)
      .subscribe(res => {
        this.dataStock = res
        console.log(this.dataStock)
      },
        err => console.log(err)
      )
  }




  //no olvidar agregar el modal-add.componenent en providers en app.module.ts
  //abre modal simple
  openModal(contenido): void {
    this.cantidad_de_ese_articulo = 0
    this.parent.openCentrado(contenido)
  }



  //abrir modal pasando mas parametros
  openModalWithParams(contenido, articulo_id): void {
    this.sedono = false
    this.errordonacion = false
    this.parent.openCentrado(contenido)

    this.articulo_id = articulo_id //ARTICULO A DONAR
    const el = this.dataStock.find(x => x.id === articulo_id)
    this.cantidad_de_ese_articulo = el.cantidad //CANTIDAD DISPONIBLE DE ESE ART
  }

  //cierro modal
  closeModal(): void {
    this.parent.modal.dismissAll()
  }


  cambiarOption(e): void {
    //console.log(e.target.value)
    this.id_causa_seleccionada = 0
    this.id_causa_seleccionada = e.target.value
  }



  donarCausa(id_art, id_causa, cantidad): void {
    //console.log(id_art, id_causa, cantidad)
    this.OrgStock_Causa = {
      id_orgstock: id_art,
      id_causas: id_causa,
      cantidad: cantidad,
      fecha: new Date()
    }

    let resta = this.cantidad_de_ese_articulo - cantidad

    if (resta >= 0) { //stock suficiente???

      this.orgService.donar(this.OrgStock_Causa)
        .subscribe(res => {
          console.log(res)
        }, err => console.log(err.message)
        )

      this.orgService.descontar(id_art, resta)
        .subscribe(res => {
          console.log(res)
          this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['org'])
            })
          this.sedono = true
        }, err => console.log(err.message)
        )
    }else{
      this.errordonacion=true
    }
  }





  //funcion que guarda en db
  addArticuloDB(art: Articulo): void {
    this.articulo.id_organizacion = this.id_org
    this.orgService.saveInStock(art)
      .subscribe(res => {
        this.res = res
        //actualizo la pagina.
        this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['org'])
          })
        this.closeModal()
      }, err => {
        this.errores = err.error.errors
        //console.log(err),
      })
  }





  //cambiar email de org.
  changePass(passNuevo: string, id: number): void {
    this.orgService.cambiarPass(passNuevo, id)
      .subscribe(res => {
        this.errores = null
        this.res = res
        if (this.res.status === 204) { //si va todo bien. recurso actualizado.204
          this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['org'])
            })
          this.closeModal()
        }
      },
        err => {
          this.errores = err.error.errors
        }
      )
  }


  getCausas() {
    this.causasSrv.getCausas()
      .subscribe(res => {
        this.causas = res
        console.log(this.causas)
      },
        err => console.log(err)
      )
  }



getMisDonaciones(id: string ): void{
  this.orgService.misDonaciones(id)
    .subscribe(x=>{
       this.misdonaciones=x
       console.log(this.misdonaciones)
    },
    error=>console.log(error)
    )
}


}

import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DonacionAnonima } from 'src/app/models/donacionAnonima';
import AnonimoService from 'src/app/services/anonimos.service';
import { DonacionComponent } from '../donaciones/donaciones.component';
import { isJwtExpired } from 'jwt-check-expiration';
import CausasServices from 'src/app/services/causas.service ';
import { Causa } from 'src/app/models/causa';



@Component({
  selector: 'app-nav-bar-component',
  templateUrl: './nav-bar-component.component.html',
  styleUrls: ['./nav-bar-component.component.css']
})
export class NavBarComponentComponent implements OnInit {


  sedono: boolean
  causas: any
  donacionAnonima: DonacionAnonima = {
    fecha: new Date(),
    importe: 0,
    causa: '',
  }

  constructor(private modal: NgbModal, private causasSrv: CausasServices, private anonimoService: AnonimoService, private router: Router) { }

  ngOnInit() {
    this.sedono = false
    //console.log('isExpired is:', isJwtExpired(localStorage.getItem('token')))
  }

  openCentrado(contenido): void {
    this.getCausas()
    this.modal.open(contenido, { centered: true })
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


  donar(donacion: DonacionAnonima): void {
    this.sedono = true
    this.anonimoService.donarAnonimo(donacion)
      .subscribe(
        res => {
          console.log(res)
          //recargando web al guardar nueva donacion
          this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['donaciones']);
            })
        },
        err => {
          console.error(err)
        }
      )
  }



  close(): void {
    this.modal.dismissAll()
    this.sedono = false
  }



  logOut(): void {
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }



  isLoggedIn(): boolean {
    if (localStorage.getItem('token') !== null) {
      if (isJwtExpired(localStorage.getItem('token')) == false) {
        return true
      }
    } else {
      return false
    }
  }




}



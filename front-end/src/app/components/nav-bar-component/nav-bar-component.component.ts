import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DonacionAnonima } from 'src/app/models/donacionAnonima';
import AnonimoService from 'src/app/services/anonimos.service';
import { DonacionComponent } from '../donaciones/donaciones.component';

@Component({
  selector: 'app-nav-bar-component',
  templateUrl: './nav-bar-component.component.html',
  styleUrls: ['./nav-bar-component.component.css']
})
export class NavBarComponentComponent implements OnInit {

  sedono: boolean
  donacionAnonima: DonacionAnonima = {
    fecha: new Date(),
    importe: 0,
    causa: '',
  }

  constructor(private modal: NgbModal, private anonimoService: AnonimoService, private router: Router) { }

  ngOnInit() {
    this.sedono = false
  }

  openCentrado(contenido): void {
    this.modal.open(contenido, { centered: true })
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




}



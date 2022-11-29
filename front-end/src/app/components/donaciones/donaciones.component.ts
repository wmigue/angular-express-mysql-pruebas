import { Component, HostBinding, OnInit } from '@angular/core';
import { DonacionAnonima } from 'src/app/models/donacionAnonima';
import AnonimoService from 'src/app/services/anonimos.service';
import OrganizacionesService from 'src/app/services/organizaciones.service';


@Component({
  selector: 'app-donacion-solicitud',
  templateUrl: './donaciones.component.html',
  styleUrls: ['./donaciones.component.css']
})
export class DonacionComponent implements OnInit {

  //@HostBinding('class') clases = 'row';

  public donaciones1: any
  public donaciones2: any


  constructor(private anonimoService: AnonimoService, private orgSrv: OrganizacionesService) {
  }

  ngOnInit() {
    this.todas()
    this.todas2()
  }


  todas(): void {
    this.anonimoService.getAnonimos()
      .subscribe(datos => {
        //console.log(datos)
        this.donaciones1 = datos
      },
        err => console.log(err)
      )
  }

  todas2(): void {
    this.orgSrv.listarDonacionesDeOrg()
      .subscribe(datos => {
        console.log(datos)
        this.donaciones2 = datos
      },
        err => console.log(err)
      )
  }
}

import { Component, HostBinding, OnInit } from '@angular/core';
import { DonacionAnonima } from 'src/app/models/donacionAnonima';
import AnonimoService from 'src/app/services/anonimos.service';


@Component({
  selector: 'app-donacion-solicitud',
  templateUrl: './donaciones.component.html',
  styleUrls: ['./donaciones.component.css']
})
export class DonacionComponent implements OnInit {

  @HostBinding('class') clases = 'row';

  public donaciones: any

  constructor(private anonimoService: AnonimoService) {
  }

  ngOnInit() {
    this.todas()
  }


  todas(): void {
    this.anonimoService.getAnonimos()
      .subscribe(datos => {
        console.log(datos)
        this.donaciones = datos
      },
        err => console.log(err)
      )
  }
}

import { Component, OnInit } from '@angular/core';
import { IDonacion } from 'src/app/models/donacion';
import { DonacionService } from 'src/app/services/donacion.service';

@Component({
  selector: 'app-donacion-solicitud',
  templateUrl: './donaciones.component.html',
  styleUrls: ['./donaciones.component.css']
})
export class DonacionComponent implements OnInit {
  public donaciones: IDonacion[];

  constructor(private donacionService: DonacionService) {
  }

  ngOnInit() {
    this.donacionService.getAll().subscribe(datos =>{
      this.donaciones = datos;
    });
  }
}

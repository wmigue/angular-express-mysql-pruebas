import { Component, OnInit } from '@angular/core';
import { IDonacion } from 'src/app/models/donacion';
import { DonacionService } from 'src/app/services/donacion.service';
import { DonacionSolicitudService } from 'src/app/services/donacionSolicitud.service';
import { OrganizacionService } from 'src/app/services/organizacion.service';

@Component({
  selector: 'app-donacion-solicitud',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public donaciones: IDonacion[];
  public totales: number;
  public totalesFinales: number;
  public donacionMasGrande: IDonacion;
  public donacionesTotales: number;
  constructor(
    private donacionService: DonacionService,
    private donacionSolicitudService: DonacionSolicitudService
    ) {
  }

  ngOnInit() {
    this.donacionService.donacionesMasGrande().subscribe(donacion =>{
      this.donacionMasGrande = donacion
    });
    this.donacionService.donacionesRecibidas().subscribe(totales =>{
      this.donacionesTotales = totales
    });
    this.donacionSolicitudService.donacionesSolicitudTotales().subscribe(totales => this.totales= totales)
    this.donacionSolicitudService.donacionesSolicitudFinalizadas().subscribe(totalesFinales => this.totalesFinales= totalesFinales)
  }
}

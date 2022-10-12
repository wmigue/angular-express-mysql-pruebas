import { Component, OnInit } from '@angular/core';
import { IOrganizacion } from 'src/app/models/organizacion';
import { OrganizacionService } from 'src/app/services/organizacion.service';

@Component({
  selector: 'app-organizacion',
  templateUrl: './organizacion.component.html',
  styleUrls: ['./organizacion.component.css']
})
export class OrganizacionComponent implements OnInit {
  public organizaciones: IOrganizacion[];

  constructor(private organizacionService: OrganizacionService) {
  }

  ngOnInit() {
    this.organizacionService.getAll().subscribe(datos =>{
      this.organizaciones = datos
    });
  }

  borrar(id:number){
    this.organizacionService.delete(id).subscribe(() =>this.organizaciones = this.organizaciones.filter(a => a.id != id))
  }
}

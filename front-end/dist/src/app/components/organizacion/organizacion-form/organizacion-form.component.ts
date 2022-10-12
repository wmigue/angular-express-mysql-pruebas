import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { IDonacion } from 'src/app/models/donacion';
import { IEstado } from 'src/app/models/estado';
import { IOrganizacion } from 'src/app/models/organizacion';
import { Usuario } from 'src/app/models/usuario';
import { EstadoService } from 'src/app/services/estado.service copy';
import { OrganizacionService } from 'src/app/services/organizacion.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-organizacion-form',
  templateUrl: './organizacion-form.component.html',
  styleUrls: ['./organizacion-form.component.css'],
  providers: [DatePipe]
})
export class OrganizacionFormComponent implements OnInit {
    organizacionForm = new FormGroup({
    nombreFormControl:new FormControl('',Validators.required),
    descripcionFormControl:new FormControl('',Validators.required),
    contactoFormControl:new FormControl('',Validators.required)
  });

  organizacionId:number;
  esEditar: boolean=false;
  contactos: any = [];
  nombre:string;
  descripcion:string;
  contactoId:number;

  constructor(
              private organizacionService: OrganizacionService,
              private usuarioService: UsuariosService,
              protected route: Router,
              private activatedRoute:ActivatedRoute){

    this.activatedRoute.params.subscribe(
      params => {
        this.organizacionId=params['id'];

        if( !isNaN(this.organizacionId)  )
        {
          this.esEditar =true;
          this.organizacionService.get(this.organizacionId)
          .subscribe(
            u => {
              console.log(u);
              this.completarDatosFormulario(u)
            },
              error=> console.error(error)
            );
        }
      });
  }

  ngOnInit() {
    this.usuarioService.getAll().subscribe(data =>{
      this.contactos = data;
    });
  }

  completarDatosFormulario(organizacion:IOrganizacion){
    this.nombre = organizacion.nombre;
    this.descripcion = organizacion.descripcion;
    this.contactoId = organizacion.contactoId;
  }

  public validar(formGroup: FormGroup) {
    for (let i in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(i)) {
        formGroup.controls[i].updateValueAndValidity();
        formGroup.controls[i].markAsDirty();
      }
    }
  }

  guardar(){
    this.validar(this.organizacionForm);
      if(this.organizacionForm.valid){
        var organizacion:IOrganizacion = {
          id:0,
          nombre:this.nombre,
          descripcion:this.descripcion,
          contactoId: parseInt(this.contactoId.toString()),
          contacto: undefined,
          usuarioOrganizacion: undefined
          };

        if(this.esEditar){

          organizacion.id = parseInt(this.organizacionId.toString())

          this.organizacionService.update(this.organizacionId,organizacion).subscribe( r =>{
                        this.route.navigate(['/organizacion'])
                        },
                        ()=> alert("No se pudo actualizar, por un error"));
        }else{

          this.organizacionService.create(organizacion).subscribe(()=>{
                        alert("Creación Exitosa")
                        this.route.navigate(['/organizacion'])
                        },
                        ()=> alert("No se pudo actualizar, por un error"));
        }
      }
    }
}

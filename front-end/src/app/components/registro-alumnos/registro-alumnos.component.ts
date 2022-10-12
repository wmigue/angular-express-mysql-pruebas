import { Component, HostBinding, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-registro-alumnos',
  templateUrl: './registro-alumnos.component.html',
  styleUrls: ['./registro-alumnos.component.css']
})
export class RegistroAlumnosComponent implements OnInit {

  @HostBinding('class') clases = 'row';
  
  usuario: Usuario = {
    id: 0,
    nombre: '',
    apellido: '',
    role: '',
    password: 'password',
    mail: '',
    created_at: new Date(),
    estado: 'no habilitado',
    taller:''
  }

  registrado: boolean


  constructor(private usuarioService: UsuariosService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.registrado=false
  }

  saveUsuario() {
    this.usuarioService.guardarUsuario(this.usuario)
      .subscribe(
        res => {
          console.log(res)
          this.registrado=true
        },
        err => console.error(err)
      )
  }

}

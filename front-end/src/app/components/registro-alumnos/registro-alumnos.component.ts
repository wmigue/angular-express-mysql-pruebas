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

  res: any = {}
  errores: Object = { msg: '', param: '' }
  registrado: boolean
  usuario: Usuario = {
    id: 0,
    nombre: '',
    apellido: '',
    role: '',
    password: 'password',
    mail: '',
    created_at: new Date(),
    estado: 'no habilitado',
    taller: ''
  }




  constructor(private usuarioService: UsuariosService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.registrado = false
  }

  saveUsuario() {
    this.usuarioService.guardarUsuario(this.usuario)
      .subscribe(
        res => {
          //console.log(res)
          this.res = res
          //error que viene de usuarioController en la propiedad error=1 osea, ese usuario ya existe en la base de datos.
          !this.res.error ? this.registrado = true : this.errores = [{ msg: this.res.message, param: this.res.status }]
        },
        err => {
          //express-validator se ejecuta aca (validaciones en el backend de los campos que le mandamos desde el body del frontend)
          this.errores = err.error.errors
          for (let e of err.error.errors) {
            console.log(e)
          }
        }
      )
  }

}

import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuarioComponent } from '../usuario.component';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {

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


  constructor(private usuarioService: UsuariosService, private router: Router, private activatedRoute: ActivatedRoute, private parent: UsuarioComponent) {

  }

  ngOnInit() {

  }

  saveUsuario() {
    this.usuarioService.guardarUsuario(this.usuario)
      .subscribe(
        res => {
          this.res = res
          !this.res.error ? this.registrado = true : this.errores = [{ msg: this.res.message, param: this.res.status }]
          this.parent.getUsuarios()
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

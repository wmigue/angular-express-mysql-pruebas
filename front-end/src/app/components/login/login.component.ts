import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  encontrado: boolean
  mail: string
  pass: string
  usuario: Usuario

  constructor(private usuarioService: UsuariosService, private router: Router, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.encontrado = false
  }

  logarse(pass: string, mail: string) {
    this.usuarioService.sigIn(pass, mail)
      .subscribe(
        res => {
          //console.log(res.user[0])
          res.user.length > 0 && res.user[0].estado=='habilitado' ? (
            this.encontrado = true,
            this.usuario=res.user[0]
          ) : (
            false
          )

        },
        err => console.error(err)
      )
  }

}

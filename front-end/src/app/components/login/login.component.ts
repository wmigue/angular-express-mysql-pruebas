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

  // encontrado: boolean
  mail: string
  pass: string
  usuario: Usuario

  errores: boolean = false

  data: any = {}

  constructor(private usuarioService: UsuariosService, private router: Router, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {

  }

  logarse(pass: string, mail: string) {
    this.usuarioService.sigIn(pass, mail)
      .subscribe(
        res => {
          this.data = res
          if(this.data.error==1){
            this.errores=true
          }else{
            localStorage.setItem('token', this.data.token)
            this.router.navigate(['/mitaller'])
          }
        },
        err => {
         console.error(err)
        }
      )
  }

}

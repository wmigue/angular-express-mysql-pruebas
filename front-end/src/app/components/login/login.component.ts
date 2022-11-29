import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';
import { Usuario } from 'src/app/models/usuario';
import OrganizacionesService from 'src/app/services/organizaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mail: string
  pass: string
  soyUnaOrg: boolean = false
  errores: boolean = false
  data: any = {}
  //usuario: Usuario
  // encontrado: boolean

  constructor(private usuarioService: UsuariosService, private orgSrv: OrganizacionesService, private router: Router, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {

  }


  logarse(pass: string, mail: string) {
    // console.log(this.soyUnaOrg)
    if (this.soyUnaOrg) {
      this.orgSrv.sigIn(pass, mail)
        .subscribe(
          res => {
            this.data = res
            if (this.data.error == 1) {
              this.errores = true
            } else {
              localStorage.setItem('token', this.data.token)
              if (this.data.rol === 'org' && this.data.estado=='habilitado') {
                this.router.navigate(['/org', this.data.id_usuario])
              }else{
                //localStorage.removeItem('token')
                this.router.navigate(['/errores', 'quizas no estes habilitado aun por el admin.'])
              }
            }
          },
          err => {
            console.error(err)
          }
        )

    } else {
      this.usuarioService.sigIn(pass, mail)
        .subscribe(
          res => {
            this.data = res
            if (this.data.error == 1) {
              this.errores = true
            } else {
              localStorage.setItem('token', this.data.token)
              if (this.data.rol === 'admin') {
                this.router.navigate(['/admin'])
              } else {
                this.router.navigate(['/mitaller'])
              }
            }
          },
          err => {
            console.error(err)
          }
        )
    }
  }







}

import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Taller } from 'src/app/models/taller';
import { TalleresService } from 'src/app/services/talleres.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-mi-taller',
  templateUrl: './mi-taller.component.html',
  styleUrls: ['./mi-taller.component.css']
})



export class MiTallerComponent implements OnInit {

  data: any
  taller: Array<Taller>

  constructor(private usuarioService: UsuariosService, private talleresService: TalleresService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getMiInfo()

  }

  private getMiInfo(): void {
    this.usuarioService.miInfo()
      .subscribe(
        res => {
          this.data = res
          console.log(JSON.stringify(res))
          //console.log(this.data.usuario[0].estado)
          if (this.data.usuario[0].estado === 'no habilitado') {
            this.router.navigate(['/errores', 'no estas habilitado por el admin.'])
          } else {
            this.getUno(this.data.usuario[0].taller)
            this.router.navigate(['/mitaller'])
          }
        },
        err => { //error que viene de isAuthenticated middleware cuando no hay token.
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/login']) // si expira el token , me envia al login. (60 seg.)
            }
          }
        }
      )

  }


  private getUno(nombretaller: string): void {
    this.talleresService.getUno(nombretaller)
      .subscribe(
        res => {
          this.taller = res[0]
          console.log("tu taller -> " + JSON.stringify(res[0]));
        },
        err => console.log(err)
      )
  }






}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-mi-taller',
  templateUrl: './mi-taller.component.html',
  styleUrls: ['./mi-taller.component.css']
})
export class MiTallerComponent implements OnInit {

  data: any = {}

  constructor(private usuarioService: UsuariosService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getTalleres()
  }

  getTalleres() {
    this.usuarioService.misTalleres()
      .subscribe(
        res => {
          this.data = res
          console.log(this.data.usuario)
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/login']) // si expira el token , me envia al login. (60 seg.)
            }
          }
        }
      )
  }

}

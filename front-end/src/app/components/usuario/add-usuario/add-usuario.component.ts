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
  
  usuario: Usuario = {
    id: 0,
    nombre: '',
    apellido: '',
    role: '',
    password: '',
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
          console.log(res)
          this.parent.getUsuarios() //metodo que viene del padre
          //this.router.navigate(['/usuarios']);
        },
        err => console.error(err)
      )
  }

}

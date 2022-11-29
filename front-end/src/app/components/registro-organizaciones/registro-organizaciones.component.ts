import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OrganizacionesService } from '../../services/organizaciones.service'
import { Organizacion } from 'src/app/models/organizacion';
import { FormBuilder, FormGroup } from '@angular/forms';
//import { GoogleMapsModule } from '@angular/google-maps';



@Component({
  selector: 'app-registro-organizaciones',
  templateUrl: './registro-organizaciones.component.html',
  styleUrls: ['./registro-organizaciones.component.css']
})
export class RegistroOrganizacionesComponent implements OnInit {


  busqueda: string = ''
  API_KEY2: string = 'AIzaSyA7Lo5gtP5CsaOqGRQfyx0JILFXhfVR-7A'
  url: string = "https://www.google.com/maps/embed/v1/place?key=" + this.API_KEY2 + "&q=" + this.busqueda
  urlSafe: SafeResourceUrl


  res: any = {}
  errores: Object = { msg: '', param: '' }
  registrado: boolean
  public archivos: any = []
  public previsualizacion: string;
  public form: FormGroup


  constructor(public fb: FormBuilder, private sanitizer: DomSanitizer, private organizacionesService: OrganizacionesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/org'])
    } else {
      this.form = this.fb.group({
        foto: [''],
        password: [''],
        ter: [false],
        mail: [''],
        telefono: [''],
        nombre: [''],
      })

      this.registrado = false
    }
  }





  buscarMapa(e) {
    e.preventDefault()
    this.busqueda = e.target.value
    this.url = "https://www.google.com/maps/embed/v1/place?key=" + this.API_KEY2 + "&q=" + this.busqueda
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url)
  }






  save() {
    const formdata = new FormData()
    //cargando a un formdata todos los valores.
    const imagen = this.archivos[0]
    for (let [k, v] of Object.entries(this.form.value)) {
      if (k == 'foto') {
        formdata.append('foto', imagen)
      }
      formdata.append(k, this.form.get(k).value)
    }

    //enviando los datos del formulario.
    this.organizacionesService.guardar(formdata)
      .subscribe(
        res => {
          this.res = res
          //error que viene de usuarioController en la propiedad param=403 osea, ese usuario ya existe en la base de datos.
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




  //captura el evento de seleccionar imagen.
  capturarFile(event): any {
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base
    })
    this.archivos.push(archivoCapturado)
  }



  //extrae a base64 para poder visualizarla cuando la secciona.
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event)
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg)
      const reader = new FileReader()
      reader.readAsDataURL($event)
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })












}

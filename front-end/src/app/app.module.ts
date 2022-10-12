import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosService } from './services/usuarios.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { OrganizacionFormComponent } from './components/organizacion/organizacion-form/organizacion-form.component';
import { OrganizacionComponent } from './components/organizacion/organizacion.component';
import { DonacionComponent } from './components/donaciones/donaciones.component';
import { HomeComponent } from './components/home/home.component';
import { AddUsuarioComponent } from './components/usuario/add-usuario/add-usuario.component';
import { NavBarComponentComponent } from './components/nav-bar-component/nav-bar-component.component';
import { FooterComponent } from './components/footer/footer.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AdminComponentComponent } from './components/admin-component/admin-component.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroAlumnosComponent } from './components/registro-alumnos/registro-alumnos.component';



@NgModule({
  declarations: [
    AppComponent,
/*     DonacionSolicitudFormComponent,
    DonacionSolicitudComponent, */
    UsuarioComponent,
/*     UsuarioFormComponent,
   
    DonarSolicitudFormComponent,
    
    DonacionComponent, */
    OrganizacionFormComponent,
    OrganizacionComponent,
    HomeComponent,
    AddUsuarioComponent,
    NavBarComponentComponent,
    FooterComponent,
    AdminComponentComponent,
    LoginComponent,
    RegistroAlumnosComponent,

  
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }

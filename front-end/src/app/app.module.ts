import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosService } from './services/usuarios.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { MiTallerComponent } from './components/login/mi-taller/mi-taller.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { ErroresComponent } from './components/errores/errores.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { QuinesSomosComponent } from './components/quines-somos/quines-somos.component';
import { TalleresService } from './services/talleres.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import AnonimoService from './services/anonimos.service';


@NgModule({
  declarations: [
    AppComponent,
    QuinesSomosComponent,
    UsuarioComponent,
    OrganizacionFormComponent,
    OrganizacionComponent,
    HomeComponent,
    AddUsuarioComponent,
    NavBarComponentComponent,
    FooterComponent,
    AdminComponentComponent,
    LoginComponent,
    RegistroAlumnosComponent,
    MiTallerComponent,
    ErroresComponent,
    NoticiasComponent,
    DonacionComponent

   
        /*     DonacionSolicitudFormComponent,
        DonacionSolicitudComponent, */
    /*     UsuarioFormComponent,
       
        DonarSolicitudFormComponent,
        
        DonacionComponent, */
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
   
  ],
  providers: [
    UsuariosService, 
    TalleresService,
    AnonimoService,
    DonacionComponent,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

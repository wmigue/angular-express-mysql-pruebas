import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonacionComponent } from './components/donaciones/donaciones.component';
import { HomeComponent } from './components/home/home.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AdminComponentComponent } from './components/admin-component/admin-component.component';
import { RegistroAlumnosComponent } from './components/registro-alumnos/registro-alumnos.component';
import { LoginComponent } from './components/login/login.component';
import { MiTallerComponent } from './components/login/mi-taller/mi-taller.component';
import { ErroresComponent } from './components/errores/errores.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { QuinesSomosComponent } from './components/quines-somos/quines-somos.component';
import { RegistroOrganizacionesComponent } from './components/registro-organizaciones/registro-organizaciones.component';
import { OrgComponent } from './components/org/org.component';
import { OrganizacionesComponent } from './components/organizaciones/organizaciones.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: AdminComponentComponent
  },
  {
    path: 'noticias',
    component: NoticiasComponent
  },
  {
    path: 'donaciones',
    component: DonacionComponent
  },
  {
    path: 'quienes-somos',
    component: QuinesSomosComponent
  },
  {
    path: 'errores/:mensaje',
    component: ErroresComponent
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
    
  },
  {
    path: 'org/:id',
    component: OrgComponent,
    
  },
  {
    path: 'org',
    component: OrgComponent,
    
  },
  {
    path: 'organizacion',
    component: OrganizacionesComponent,
    
  },
  {
    path: 'organizaciones',
    component:RegistroOrganizacionesComponent
  },
  {
    path: 'registroTaller',
    component: RegistroAlumnosComponent
  },

  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'mitaller',
    component:MiTallerComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

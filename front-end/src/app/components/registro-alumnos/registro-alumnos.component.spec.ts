import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//import { By } from 'protractor';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RegistroAlumnosComponent } from './registro-alumnos.component';
import { UsuariosService } from '../../services/usuarios.service'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';


describe('RegistroAlumnosComponent', () => {
  let httpClientSpy: { post: jasmine.Spy };
  let usuarioService: UsuariosService
  let component: RegistroAlumnosComponent;
  let fixture: ComponentFixture<RegistroAlumnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [RegistroAlumnosComponent],
      /*       schemas: [
              NO_ERRORS_SCHEMA
          ] */
    })
    usuarioService = TestBed.get(UsuariosService)
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    usuarioService = new UsuariosService(httpClientSpy as any);
    fixture = TestBed.createComponent(RegistroAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('componentes implicados en el test deben crearse correctamente', () => {
    expect(component).toBeTruthy();
    expect(usuarioService).toBeTruthy();
  });



});

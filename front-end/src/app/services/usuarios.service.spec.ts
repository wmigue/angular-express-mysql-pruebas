import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';
import { UsuariosService } from './usuarios.service';

fdescribe('TEST del archivo usuario.service.ts (servicio de crud http para usuarios)', () => {
    let httpClientSpy: { post: jasmine.Spy };
    let usuarioService: UsuariosService

    beforeEach(() => { //inicializamos los componentes que vamos a usar.
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']); //con esto simulamos una peticion http tipo post.
        usuarioService = new UsuariosService(httpClientSpy as any); //le pasamos el simulador para que emule las peticiones.
    });

    it('test2: componentes implicados en el test se cargaron correctamente', () => {
        expect(usuarioService).toBeTruthy(); //espera lo que dice arriba justamente se cumpla.
    });

    it('test1: Ese usuario ya existe. no se puede registrar', (done: DoneFn) => {
        const usuario = {
            id: 1000,
            ter: true,
            nombre: 'administrador',
            apellido: 'administrador',
            password: 'nerdadmin',
            mail: 'admin@admin.com',
            role: 'admin',
            created_at: new Date(),
            estado: 'no habilitado',
            taller: 'forja'
        }

        const mockAEnviar = usuario

        //debe pasar el test
        const mockARecibir = { message: 'ese usuario ya existe', error: 1, status: 400 }
        
        //debe fallar el test
        //const mockARecibir2 = { message: 'usuario guardado', error: 0, status: 201 }

        httpClientSpy.post.and.returnValue(of(mockARecibir))

        usuarioService.guardarUsuario(mockAEnviar)
            .subscribe(res => {
                console.log(res);
                expect(res).toEqual(mockARecibir)
                done()
            }),
            error => console.log(error);
    });




});


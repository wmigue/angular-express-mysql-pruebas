import express, { Router } from 'express';
import usuariosController from '../controllers/usuariosController';
const { validateCreate } = require('../validators/usuarios')
const { isAuthenticated, hasRole } = require('../middlewares/auth')

class UsuariosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/',isAuthenticated, hasRole('admin'), usuariosController.list);
        this.router.delete('/:id', usuariosController.delete);
        this.router.post('/', validateCreate, usuariosController.create);
        this.router.post('/updateEstado/', usuariosController.update);
        this.router.post('/signin/', usuariosController.logarse);
        this.router.get('/miinfo/', isAuthenticated, usuariosController.miInformacion);
    }

}

export default new UsuariosRoutes().router;


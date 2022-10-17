import express, { Router } from 'express';
import usuariosController from '../controllers/usuariosController';
const { validateCreate } = require('../validators/usuarios')
const { isAuthenticated } = require('../middlewares/auth')

class UsuariosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', usuariosController.list);
        this.router.delete('/:id', usuariosController.delete);
        this.router.post('/', validateCreate, usuariosController.create);
        this.router.post('/updateEstado/', usuariosController.update);
        this.router.post('/signin/', usuariosController.logarse);
        this.router.get('/mitaller/', isAuthenticated, usuariosController.gettalleres);




        /*         this.router.get('/:id', usuariosController.getOne);
               
                this.router.put('/:id', usuariosController.update); */
    }

}

export default new UsuariosRoutes().router;


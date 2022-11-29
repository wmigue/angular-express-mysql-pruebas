import express, { Router } from 'express'
import usuariosController from '../controllers/usuariosController'
const { validateCreate } = require('../validators/usuarios')
const { isAuthenticated, hasRole } = require('../middlewares/auth')

class UsuariosRoutes {

    router: Router = Router()

    constructor() {
        this.config()
    }

    config() {
        this.router.get('/',isAuthenticated, hasRole('admin'), usuariosController.list)
        this.router.delete('/:id', isAuthenticated, hasRole('admin'), usuariosController.delete)
        this.router.post('/', validateCreate, usuariosController.create)
        this.router.post('/updateEstado/', isAuthenticated, hasRole('admin'), usuariosController.update) //habilitar usuario
        this.router.post('/signin/', usuariosController.logarse)
        this.router.get('/miinfo/', isAuthenticated, usuariosController.miInformacion)
    }

}

export default new UsuariosRoutes().router;


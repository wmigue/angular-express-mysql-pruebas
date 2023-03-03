import { Router } from 'express';
import anonimosController from '../controllers/anonimosController';
import causasController from '../controllers/causaController';
const { isAuthenticated, hasRole } = require('../middlewares/auth')
import {validateCreateCausas} from '../validators/causas.js'


class CausasRoutes {

    router: Router = Router()

    constructor() {
        this.config()
    }

    config() {
        this.router.get('/', causasController.getAll)
        this.router.post('/', validateCreateCausas, isAuthenticated, hasRole('admin'), causasController.create)
        this.router.post('/misdonaciones/', isAuthenticated, hasRole('admin'), causasController.getMisDonaciones)
        this.router.post('/aprobardesaprobar/', isAuthenticated, hasRole('admin'), causasController.aprove)
        this.router.post('/rechazar/', isAuthenticated, hasRole('admin'), causasController.reprove)
       
    }

}

export default new CausasRoutes().router


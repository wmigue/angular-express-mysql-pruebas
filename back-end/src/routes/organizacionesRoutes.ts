import { Router } from 'express'
const path = require('path')
const fs = require('fs')
const multer  = require('multer')
import organizacionesController from '../controllers/organizacionesController'
import {validateCreate} from '../validators/organizaciones.js'
import {validateCreateArticulos} from '../validators/Artuculos.js'
import {validateCreateEmail} from '../validators/email.js'
import uploadFotoMiddleware from '../middlewares/subirFoto.js' //usa multer para procesar la foto enviada por formdata.
const { isAuthenticated, hasRole } = require('../middlewares/auth')



class OrganizacionesRoutes {

    router: Router = Router()

    constructor() {
        this.config()
    }


    config() {
        this.router.get('/', organizacionesController.listAll)
        this.router.post('/', uploadFotoMiddleware, validateCreate, organizacionesController.create) 
        this.router.delete('/:id', isAuthenticated, hasRole('admin'), organizacionesController.delete)
        this.router.post('/updateEstado/', isAuthenticated, hasRole('admin'), organizacionesController.update) //habilitar org
        this.router.post('/updatemail/',validateCreateEmail, isAuthenticated, hasRole('org'), organizacionesController.updateCorreo)
        this.router.post('/signin/', organizacionesController.logarse)
        this.router.post('/viewStock/',isAuthenticated, hasRole('org'), organizacionesController.verStock)
        this.router.get('/miinfo/', isAuthenticated, hasRole('org'), organizacionesController.miInformacion)
        this.router.post('/saveInStock/',validateCreateArticulos, isAuthenticated, hasRole('org'), organizacionesController.guardarStock)
        this.router.post('/donar/', isAuthenticated, hasRole('org'), organizacionesController.donarACausa)
        this.router.post('/descontar/', isAuthenticated, hasRole('org'), organizacionesController.descontarStock)
        this.router.get('/donacionesDeOrg/', organizacionesController.listarOrgstock_Causas)
        this.router.post('/MisDonaciones/', isAuthenticated, hasRole('org'), organizacionesController.MisDonaciones)
    }

}

export default new OrganizacionesRoutes().router


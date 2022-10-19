import express, { Router } from 'express';
import talleresController from '../controllers/talleresController';
const { isAuthenticated } = require('../middlewares/auth')

class TalleresRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', talleresController.getlist);
        this.router.post('/', isAuthenticated, talleresController.getone);
       
    }

}

export default new TalleresRoutes().router;


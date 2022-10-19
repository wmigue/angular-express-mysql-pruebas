import { Router } from 'express';
import anonimosController from '../controllers/anonimosController';

class AnonimosRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', anonimosController.getAll);
        this.router.post('/', anonimosController.create);
       
    }

}

export default new AnonimosRoutes().router;


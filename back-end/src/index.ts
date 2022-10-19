import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import usuariosRoutes from './routes/usuariosRoutes';
import talleresRoutes from './routes/talleresRoutes';
import anonimosRoutes from './routes/anonimosRoutes';

class Server {

    public app: Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', 3003);
 
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.use('/api/usuarios', usuariosRoutes);
        this.app.use('/api/talleres', talleresRoutes);
        this.app.use('/api/anonimos', anonimosRoutes); 
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor escuchando en puerto -> ', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import usuariosRoutes from './routes/usuariosRoutes'
import talleresRoutes from './routes/talleresRoutes'
import anonimosRoutes from './routes/anonimosRoutes'
import organizacionesRoutes from './routes/organizacionesRoutes'
import bodyParser from 'body-parser'
import multer from "multer"
import path from 'path'
import causasRoutes from './routes/causasRoutes';


class Server {


    public app: Application

    constructor() {
        this.app = express()
        this.config()
        this.routes()
    }

    config(): void {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.set('port', 3003)
        this.app.use(morgan('dev'))
        this.app.use(cors())
        // The Public directory for static files
        this.app.use("/public", express.static(path.join(__dirname, "/public")))
        // The Uploads directory
        this.app.use("/uploads", express.static("./public/uploads"))
        this.app.use("/temp", express.static("./public/temp"))
        //this.app.use(express.json())
        //this.app.use(express.urlencoded({extended: false}))
        // this.app.use(multer({ dest: "./uploads" }).single("foto"))

    }

    routes(): void {
        this.app.use('/api/usuarios', usuariosRoutes)
        this.app.use('/api/talleres', talleresRoutes)
        this.app.use('/api/anonimos', anonimosRoutes)
        this.app.use('/api/organizaciones', organizacionesRoutes)
        this.app.use('/api/causas', causasRoutes)
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor escuchando en puerto -> ', this.app.get('port'))
        })
    }

}

const server = new Server()
server.start()
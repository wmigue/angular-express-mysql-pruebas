import { Request, Response } from 'express'

import pool from '../database'

class TalleresController {

    public async getlist(req: Request, res: Response): Promise<void> {
        const talleres = await pool.query('SELECT * FROM taller');
        res.json(talleres);
    }

    public async getone(req: Request, res: Response): Promise<void> {
        const { nombre } = req.body;
        console.log(nombre);
        const resultado = await pool.query('SELECT * FROM taller WHERE nombre = ? ', [nombre]);
        res.json(resultado);
    }

}

const talleresController = new TalleresController;
export default talleresController;
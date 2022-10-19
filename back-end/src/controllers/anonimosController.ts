import { Request, Response } from 'express'

import pool from '../database'

class AnonimosController {

    public async getAll(req: Request, res: Response): Promise<void> {
        const resultado = await pool.query('SELECT * FROM anonimas');
        res.json(resultado);
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO anonimas set ?', [req.body]),
        res.json({ message: 'donacion exitosa', error: 0, status: 201 })
    }

}

const anonimosController = new AnonimosController;
export default anonimosController;
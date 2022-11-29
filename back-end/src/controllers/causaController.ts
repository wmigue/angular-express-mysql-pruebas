import { Request, Response } from 'express'

import pool from '../database'

class CausasController {

    public async getAll(req: Request, res: Response): Promise<void> {
        const resultado = await pool.query('SELECT * FROM causas')
        res.json(resultado)
    }

    public async getMisDonaciones(req: Request, res: Response): Promise<void> {
        const { id } = req.body
        const resultado = await pool.query('SELECT d.id, c.id AS cid, d.fecha, d.aprobado, o.nombre, d.cantidad, a.articulo, c.denominacion FROM organizaciones o, orgstock_causas d, orgstock a, causas c WHERE o.id=a.id_organizacion and a.id=d.id_orgstock AND c.id=d.id_causas AND c.id=?', [id]);
        res.json(resultado)
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO causas set ?', [req.body]),
            res.json({ message: 'se agrego la causa exitosamente.', error: 0, status: 201 })
    }

    public async aprove(req: Request, res: Response): Promise<void> {
        await pool.query('UPDATE orgstock_causas set aprobado=IF(aprobado=0,1,0) WHERE id=?', [req.body.id]),
            res.json({ message: 'cambio de estado exitosamente.', error: 0, status: 204 })
    }

}

const causasController = new CausasController
export default causasController
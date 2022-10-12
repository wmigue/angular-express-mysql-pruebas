import { Request, Response } from 'express';


import pool from '../database';

class UsuariosController {

    public async list(req: Request, res: Response): Promise<void> {
        const usuarios = await pool.query('SELECT * FROM usuario');
        res.json(usuarios);
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const p="nerd";
        await pool.query('DELETE FROM usuario WHERE id = ? ', [id]);
        res.json({ message: "The usuario se eliminó" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO usuario set ?', [req.body]);
        console.log(req.body);
        res.json({ message: 'usuario guardado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const result = await pool.query('UPDATE usuario set estado = "habilitado" where id = ?', [id]);
        res.json({ message: 'usuario PATCHADO' });
    }

    
    public async logarse(req: Request, res: Response): Promise<void> {
        const { mail, pass } = req.body;
        const buscado = await pool.query('SELECT * FROM usuario where password = ? AND mail = ?', [pass, mail]);
        res.json({ user: buscado});
    }


   /*  public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
        console.log(games.length);
        if (games.length > 0) {
            return res.json(games[0]);
        }
        res.status(404).json({ text: "The game doesn't exits" });
    }



    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await pool.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The game was Updated" });
    } */


}

const usuariosController = new UsuariosController;
export default usuariosController;
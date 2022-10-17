import { Request, Response } from 'express'
import { token } from 'morgan'
const express = require('express')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { signToken } = require('../helpers/signToken')

import pool from '../database'

export interface IGetUserAuthInfoRequest extends Request {
    userId: string // or any other type
}

class UsuariosController {

    public async list(req: Request, res: Response): Promise<void> {
        const usuarios = await pool.query('SELECT * FROM usuario');
        res.json(usuarios);
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //const p="nerd";
        await pool.query('DELETE FROM usuario WHERE id = ? ', [id]);
        res.json({ message: "The usuario se eliminó" });
    }


    public async create(req: Request, res: Response): Promise<void> {
        const { mail } = req.body
        let findOne = await pool.query('SELECT * FROM usuario WHERE mail = ? ', [mail])
        findOne.length >= 1 ? (
            res.json({ message: 'ese usuario ya existe', error: 1, status: 403 })
        ) : (
            findOne = await pool.query('INSERT INTO usuario set ?', [req.body]),
            res.json({ message: 'usuario guardado', error: 0, status: 201 })
        )
    }



    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const result = await pool.query('UPDATE usuario set estado = "habilitado" where id = ?', [id]);
        res.json({ message: 'usuario PATCHADO' });
    }


    public async logarse(req: Request, res: Response): Promise<void> {
        const { mail, pass } = req.body
        const buscado = await pool.query('SELECT * FROM usuario where password = ? AND mail = ?', [pass, mail])
        // console.log(JSON.stringify(buscado[0]))
        if (buscado.length > 0) {
            const token = signToken(buscado[0].id) //genero la llave.
            res.json({ token: token })
        }else{
            res.json({ error: 1, status: 404 })
        }

    }


    public async gettalleres(req: IGetUserAuthInfoRequest, res: Response): Promise<void> {
        const id = req.userId //viene del middleware isAutenticated
        const buscado = await pool.query('SELECT nombre, apellido, taller FROM usuario where id = ?', [id])
        res.json({ usuario: buscado })
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
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
        const usuarios = await pool.query('SELECT * FROM usuario')
        const organizaciones = await pool.query('SELECT * FROM organizaciones')
        const causas = await pool.query('SELECT * FROM causas')
        res.json({usuarios, organizaciones, causas})
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //const p="nerd";
        await pool.query('DELETE FROM usuario WHERE id = ? ', [id])
        res.json({ message: "The usuario se eliminó" })
    }


    public async create(req: Request, res: Response): Promise<void> {
        const { mail } = req.body
        let findOne = await pool.query('SELECT * FROM usuario WHERE mail = ? ', [mail])
        findOne.length >= 1 ? (
            res.json({ message: 'ese usuario ya existe', error: 1, status: 400 })
        ) : (
            findOne = await pool.query('INSERT INTO usuario set ?', [req.body]),
            res.json({ message: 'usuario guardado', error: 0, status: 201 })
        )
    }



    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const result = await pool.query('UPDATE usuario set estado = IF(estado="habilitado", "no habilitado", "habilitado") where id = ?', [id])
        res.json({ message: 'usuario PATCHADO' })
    }


    public async logarse(req: Request, res: Response): Promise<void> {
        const { mail, pass } = req.body
        const buscado = await pool.query('SELECT * FROM usuario where password = ? AND mail = ?', [pass, mail])
        // console.log(JSON.stringify(buscado[0]))
        if (buscado.length > 0) {
            const token = signToken(buscado[0].id, buscado[0].role) //genero token.
            res.json({ token: token, rol: buscado[0].role })
        } else {
            res.json({ error: 1, status: 404 })
        }

    }


    public async miInformacion(req: IGetUserAuthInfoRequest, res: Response): Promise<void> {
        const id = req.userId //viene del middleware isAutenticated
        const buscado = await pool.query('SELECT nombre, apellido, estado, taller, role FROM usuario where id = ?', [id])
        // console.log(JSON.stringify(buscado)) //convierto raw to json  
        res.json({ usuario: buscado })
    }




}

const usuariosController = new UsuariosController;
export default usuariosController;
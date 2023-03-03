import { NextFunction, Request, Response } from 'express'
import { token } from 'morgan'
const express = require('express')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
import fs from "fs-extra"
import path from "path"


const { signToken } = require('../helpers/signToken')


import pool from '../database'


interface MulterRequest extends Request {
    file: any
    nombretoreq: any
}

export interface IGetUserAuthInfoRequest extends Request {
    userId: string // or any other type
}


class OrganizacionesController {

    public async create(req: MulterRequest, res: Response, next: NextFunction): Promise<void> {
        const { mail, nombre, password, foto, ter } = req.body

        // console.log(req.body)

        let findOne = await pool.query('SELECT * FROM organizaciones WHERE mail = ? ', [mail])
        findOne.length >= 1 ? (
            res.json({ message: 'esa org ya existe', error: 1, status: 400 })
        ) : (
            findOne = await pool.query('INSERT INTO organizaciones(nombre, mail, password, foto) VALUES(?,?,?,?)', [nombre, mail, password, req.nombretoreq]),
            res.json({ message: 'org guardada', error: 0, status: 201 })
        )
    }



    public async listAll(req: Request, res: Response): Promise<void> {
        const usuarios = await pool.query('SELECT * FROM organizaciones')
        res.json(usuarios);
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        //const p="nerd";
        await pool.query('DELETE FROM organizaciones WHERE id = ? ', [id])
        res.json({ message: "The org se eliminó" })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.body
        const result = await pool.query('UPDATE organizaciones set estado = IF(estado="habilitado", "no habilitado", "habilitado") where id = ?', [id])
        res.json({ message: 'org PATCHADO' })
    }

    public async updatePass(req: Request, res: Response): Promise<void> {
        const { id, passNuevo } = req.body
            const result = await pool.query('UPDATE organizaciones set password = ? where id = ?', [passNuevo, id])
            res.json({ message: 'mail cambiado con exito.', status: 204 })
    }


    public async logarse(req: Request, res: Response): Promise<void> {
        const { mail, pass } = req.body
        const buscado = await pool.query('SELECT * FROM organizaciones where password = ? AND mail = ?', [pass, mail])
        // console.log(JSON.stringify(buscado[0]))
        if (buscado.length > 0) {
            const token = signToken(buscado[0].id, buscado[0].role) //genero token.
            res.json({ token: token, rol: buscado[0].role, id_usuario: buscado[0].id, estado: buscado[0].estado })
        } else {
            res.json({ error: 1, status: 404 })
        }
    }


    public async miInformacion(req: IGetUserAuthInfoRequest, res: Response): Promise<void> {
        const id = req.userId //viene del middleware isAutenticated
        const buscado = await pool.query('SELECT * FROM organizaciones where id = ?', [id])
        res.json({ usuario: buscado })
    }


    /////////////////////////////////////////////////////


    public async verStock(req: Request, res: Response): Promise<void> {
        const { id_org } = req.body
        const respuesta = await pool.query('SELECT * FROM orgStock where id_organizacion = ? and cantidad > 0', [id_org])
        res.json(respuesta)
    }

    public async guardarStock(req: Request, res: Response): Promise<void> {
        const resultado = await pool.query('INSERT INTO orgstock set ?', [req.body])
        console.log('res:' + resultado)
        res.json({ message: 'art guardado', error: 0, status: 201 })
    }


    //////////////////////////////////////////////////////////

    public async donarACausa(req: Request, res: Response): Promise<void> {
        const resultado = await pool.query('INSERT INTO orgstock_causas set ?', [req.body])
        console.log('res:' + resultado)
        res.json({ message: 'donación exitosa.', error: 0, status: 201 })
    }

    public async descontarStock(req: Request, res: Response): Promise<void> {
        const { id, cantidad } = req.body
        const result = await pool.query('UPDATE orgstock set cantidad = ? where id = ?', [cantidad, id])
        res.json({ message: 'descontado del stock con exito.', status: 204 })
    }

    public async listarOrgstock_Causas(req: Request, res: Response): Promise<void> {
        const usuarios = await pool.query(
            `SELECT d.fecha, c.denominacion, o.nombre, o.mail, a.articulo, d.cantidad 
                FROM organizaciones o, orgstock a, orgstock_causas d, causas c 
                   WHERE o.id=a.id_organizacion AND a.id=d.id_orgstock AND d.id_causas=c.id AND d.aprobado=1`
        )
        res.json(usuarios)
    }

    public async MisDonaciones(req: Request, res: Response): Promise<void> {
        const misdonaciones = await pool.query(
            `SELECT d.fecha, d.cantidad, d.aprobado, o.nombre, c.denominacion, c.pais, a.articulo 
               FROM organizaciones o, orgstock a, orgstock_causas d, causas c 
                 WHERE o.id=a.id_organizacion AND a.id=d.id_orgstock AND d.id_causas=c.id AND o.id = ?`, [req.body.id]
        )
        res.json(misdonaciones)
    }
}

const organizacionesController = new OrganizacionesController
export default organizacionesController
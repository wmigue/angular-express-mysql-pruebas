const jwt = require('jsonwebtoken')
import pool from '../database'

//middleware para saber si tiene token activo.
const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.sendStatus(403)
    }
    jwt.verify(token, 'aleatorio', async (err, decoded) => {
        const { id } = decoded
        let findOne = await pool.query('SELECT * FROM usuario WHERE id = ? ', [id])
        req.user_buscado = findOne
        next()
    })
}




module.exports = { isAuthenticated }
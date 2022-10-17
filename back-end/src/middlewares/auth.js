const jwt = require('jsonwebtoken')
const pool = require('../database')

//middleware para saber si tiene token activo.
const isAuthenticated = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauhtorized Request')
        }
        let token = req.headers.authorization

        if (token === 'null') {
            return res.status(401).send('Unauhtorized Request')
        }

        jwt.verify(token, 'secretkey', (err, decoded) => {
            const { id } = decoded
            console.log("this is the id decodificado: " + id)
            req.userId = id
            next()
        })
    } catch (e) {
        //console.log(e)
        return res.status(401).send('Unauhtorized Request');
    }
}



module.exports = { isAuthenticated }
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
            const { id, role } = decoded
            //console.log("id del usuario decodificado: " + id)
            req.rol = role
            req.userId = id
            next()
        })
    } catch (e) {
        //console.log(e)
        return res.status(401).send('Unauhtorized Request');
    }
}


//middleware para identificar que rol tiene el usuario que hace el request.
const hasRole = role => (req, res, next) => {
    if (req.rol === role) { 
        return next()
    }
    return res.status(401).send({ noHayRol: '!! No tenes el ROL requerido para ingresar al sistema .' })
}



module.exports = { isAuthenticated, hasRole }
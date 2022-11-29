const jwt = require('jsonwebtoken')


const signToken = (id, role) => { 
    return jwt.sign({ id, role }, 'secretkey', {
        expiresIn: 15 * 60, //expira el token en 60 segundos * multiplicador
    })
}

module.exports = { signToken }
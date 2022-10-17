const jwt = require('jsonwebtoken')


const signToken = (id) => { //otra encryptacion
    return jwt.sign({ id }, 'secretkey', {
        expiresIn: 60, //al token lo seteamos para que expire en 60 segundos.
    })
}

module.exports = { signToken }
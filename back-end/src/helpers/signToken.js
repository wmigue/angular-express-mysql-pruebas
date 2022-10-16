const signToken = (id) => { //otra encryptacion
    return jwt.sign({ id }, 'aleatorio', {
        expiresIn: 60,
    })
}

module.exports = { signToken }
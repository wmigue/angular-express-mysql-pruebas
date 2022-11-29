const { validationResult } = require('express-validator'); 
//import { body, validationResult } from 'express-validator';

// retorna un error si no se valida algo, sino pasa con next a la siguiente funcion o middelware.
const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        res.status(403)
        res.send({ errors: err.array() })
    }
}
module.exports = { validateResult }
//export default validateResult 
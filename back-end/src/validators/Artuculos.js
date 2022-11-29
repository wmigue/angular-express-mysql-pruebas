const { check } = require('express-validator');
//import validateResult from '../helpers/validateHelper'
const { validateResult } = require('../helpers/validateHelper')
/////
const validateCreateArticulos = [
    check('articulo')
        .exists()
        .notEmpty(),
    check('cantidad')
        .exists()
        .isFloat({ min: 1, max: 100 }),
        (req, res, next) => {
    validateResult(req, res, next)
}
]

//export default validateCreate 
module.exports = { validateCreateArticulos }
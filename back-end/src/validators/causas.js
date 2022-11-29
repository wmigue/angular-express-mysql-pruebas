const { check } = require('express-validator');
//import validateResult from '../helpers/validateHelper'
const { validateResult } = require('../helpers/validateHelper')
/////
const validateCreateCausas = [
    check('denominacion')
        .exists()
        .notEmpty(),
    check('pais')
        .exists()
        .notEmpty(),
        (req, res, next) => {
    validateResult(req, res, next)
}
]

//export default validateCreate 
module.exports = { validateCreateCausas }
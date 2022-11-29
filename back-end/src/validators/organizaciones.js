const { check } = require('express-validator');
//import validateResult from '../helpers/validateHelper'
const { validateResult } = require('../helpers/validateHelper')
/////
const validateCreate = [
    check('ter')
        .exists()
        .custom((value, { req }) => {
            console.log(value);
            if (value == 'false') {
                throw new Error('debe aceptar los términos y condiciones.')
            }
            return true
        }),
    check('nombre')
        .exists()
        .isLength({ min: 5 }),
    check('password')
        .exists()
        .custom((value, { req }) => {
            if (value.length < 3) {
                //se puede usar isLength pero para hacerlo custom es otra forma y usar una validacion propia. tambien podemos interactuar con otras propiedades del request.
                throw new Error('password debe ser mayor a 3 caracteres')
            }
            return true
        })
    ,
    check('mail')
        .exists()
        .isEmail(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

//export default validateCreate 
module.exports = { validateCreate }
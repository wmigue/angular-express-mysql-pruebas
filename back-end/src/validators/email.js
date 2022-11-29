const { check } = require('express-validator');
//import validateResult from '../helpers/validateHelper'
const { validateResult } = require('../helpers/validateHelper')
/////
const validateCreateEmail = [
    check('nuevo')
        .exists()
        .isEmail(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]


module.exports = { validateCreateEmail }
/*
    Auth directory
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { createUser, loginUser, reNewToken } = require('../controllers/authController');
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');

router.post(
    '/', 
    [
        //TODO: Middlewares
        check('email', 'Email es obligatory').isEmail(),
        check( 'password', 'Password is obligatory' ).isLength({ min: 6 }),
        fieldValidator
    ], loginUser);
router.post(
    '/new', 
    [
        //TODO: Middlewares
        check('name', 'Name is obligatory').not().isEmpty(),
        check('email', 'Email is obligatory').isEmail(),
        check('password', 'Password should be at least 6 characters').isLength({min: 6}),
        fieldValidator
    ],createUser );
    
router.get('/renew', jwtValidator , reNewToken);

module.exports = router;
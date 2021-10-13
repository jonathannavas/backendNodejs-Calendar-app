/*
    Auth directory
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { createUser, loginUser, newToken } = require('../controllers/authController');
const { fieldValidator } = require('../middlewares/field-validator');

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
router.post('/renew', newToken);

module.exports = router;
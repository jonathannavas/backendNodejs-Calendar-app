/*
    * Event Routes
    * /api/events/
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventsController');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { isDate } = require('../helpers/isDate');
const router = Router();

// * VALIDATE JWT
router.use( jwtValidator );
//TODO CRUD EVENTS

// * CREATE METHOD AND VALIDATE ALL THE ROUTES
router.get('/', getEvents);
router.post('/',[
    check('title','Title is obligatory').not().isEmpty(),
    check('start', 'Initial date is obligatory').custom( isDate ) ,
    check('end', 'End date is obligatory').custom( isDate ) ,
    fieldValidator
], createEvent);
router.put('/:id', [
    check('title','Title is obligatory').not().isEmpty(),
    check('start', 'Initial date is obligatory').custom( isDate ) ,
    check('end', 'End date is obligatory').custom( isDate ),
    fieldValidator
],updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
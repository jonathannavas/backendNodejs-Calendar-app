const { response } = require('express');
const Event = require('../models/Event');

const createEvent =  async (req, res = response) => {
    const event = new Event(req.body);
    try{

        event.user = req.uid;
        const eventDB = await event.save();
        res.status(201).json({
            ok: true,
            event: eventDB
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Talk with de admin system'
        });
    }
}

const getEvents = async (req, res = response) => {
    const events = await Event.find().populate('user', 'name');
    res.status(201).json({
        ok: true,
        events
    });
}


const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;
    try {
    
        const event = await Event.findById(eventId);
        if( !event ){
            return res.status(404).json({
                ok: false,
                msg: 'This event doesnt exists'
            });
        }

        if( event.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'You cant update this event'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated =  await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

        res.status(201).json({
            ok: true,
            event: eventUpdated
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
           ok: false,
           msg: 'Talk with de admin system' 
        });
    }
 
}

const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
    
        const event = await Event.findById(eventId);
        if( !event ){
            return res.status(404).json({
                ok: false,
                msg: 'This event doesnt exists'
            });
        }
        if( event.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'You cant delete this event'
            });
        }

        const eventDeleted =  await Event.findByIdAndDelete( eventId );

        res.status(201).json({
            ok: true,
            eventDeleted
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
           ok: false,
           msg: 'Talk with de admin system' 
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
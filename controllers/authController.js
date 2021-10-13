const { response } = require('express');

const bcrypt = require('bcryptjs');

const User = require('../models/User');

const loginUser =  async (req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'Email incorrect'
            });  
        }

        //check password
        const validPassword = bcrypt.compareSync( password, user.password );
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password Incorrect'
            });
        }

        // Generate JWT

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name
        });


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Talk with the admin'
        }); 
    }

}

const createUser = async (req, res = response) => {

    const {email, password} = req.body;
    
    try{

        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({
                ok: false,
                msg: `This email ${email} has been used`
            });  
        }

        user = new User( req.body );

        // encript password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        });
  
    }catch(err){
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Talk with the admin'
        });
    }

}

const newToken = (req, res = response) => {

    const { name, email, password } = req.body;

    res.json({
        code: 200,
        msg: 'renewToken',
        name, 
        email, 
        password
    });

}

module.exports = {
    createUser,
    loginUser,
    newToken
};
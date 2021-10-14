const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

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

        // TODO Generate JWT

        const token = await generateJWT( user.id, user.name );

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
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

        // TODO Generate JWT

        const token = await generateJWT( user.id, user.name );

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
  
    }catch(err){
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Talk with the admin'
        });
    }

}

const reNewToken = async (req, res = response) => {

    const {uid, name} = req;

    const token = await generateJWT( uid, name );

    res.status(200).json({
        ok: true,
        token,
        uid,
        name
    });
 
}

module.exports = {
    createUser,
    loginUser,
    reNewToken
};
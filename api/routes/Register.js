const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config()

router.post('/register', async(req, res) => {
    const bcryptSalt = await bcrypt.genSalt(10);
    const { username, email, password } = req.body;
    const usernameExist = await User.findOne({username: username});
    const emailExist = await User.findOne({email: email});
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);
    if (emailExist || usernameExist ) {
        return res.json("User already exists");
    }
    if (!username || !email || !password ) {
        return res.json('Please fill out all fields')
    }
    if (req.body.verified) {
        return res.json('404')
    } 
    try {
        const user = new User({
            username,
            email,
            password:hashedPassword
        })
        const savedUser = await user.save();
        const token = jwt.sign({id: user._id}, process.env.JWT);
        res.cookie('token', token).status(200).json('Successfully Registered!')
    } catch (error) {
        res.json(error);    
    }
})

module.exports = router;
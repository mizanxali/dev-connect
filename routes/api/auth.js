const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../../middleware/auth')
const User = require('../../models/User')

// @route   GET api/auth
// @desc    Get logged in user details (except password)
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error!")
    }
})

// @route   POST api/auth
// @desc    Authenticate user, log them in and get token
// @access  Public
router.post('/',
    [
    check('email', 'Please enter a valid email.').isEmail(),
    check('password', 'Password is required.').exists()
    ],
    async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body

    try {
        //check if user already exists, if not continue
        let user = await User.findOne({email: email})
        if(!user) {
            return res.status(400).json({errors: [{msg: "User does not exist."}]})
        }

        //match password, if matched continue
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({errors: [{msg: "Wrong password."}]})
        }

        //return JWT to client
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get("jwtSecret"), {expiresIn: 360000}, (err, token) => {
            if(err) {
                throw err
            }
            res.json({token: token})
        })
        
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error!")
    }
})

module.exports = router
const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const Profile = require('../../models/Profile')

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['email', 'name', 'avatar'])
        if(!profile) {
            return res.status(400).json({errors: [{msg: "Profile doesn't exist."}]})
        }
        res.json(profile)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error!")
    }
})

// @route   POST api/profile
// @desc    Create/Update current user's profile
// @access  Private
router.post('/', [auth, [
    check('position', 'Position is required.').not().isEmpty(),
    check('skills', 'Please enter at least one skill.').not().isEmpty()
    ]],
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        //destructure the request.body
        const { organization, website, location, position, skills, bio, githubUsername, youtube, twitter, instagram, linkedin, facebook } = req.body

        //create new profile object
        const profileFields = {}
        profileFields.user = req.user.id
        profileFields.position = position
        profileFields.skills = (skills.split(',').map(skill => skill.trim())) //change skills from a comma separated string to an array
        //check if optional fields were sent from client side and add them to the profileFields object
        if(organization) profileFields.organization = organization
        if(website) profileFields.website = website
        if(location) profileFields.location = location
        if(bio) profileFields.bio = bio
        if(githubUsername) profileFields.githubUsername = githubUsername
        //create a nested social object
        profileFields.social = {}
        if(youtube) profileFields.social.youtube = youtube
        if(twitter) profileFields.social.twitter = twitter
        if(instagram) profileFields.social.instagram = instagram
        if(linkedin) profileFields.social.linkedin = linkedin
        if(facebook) profileFields.social.facebook = facebook

        try {
            //check if profile already exists
            let profile = await Profile.findOne({user: req.user.id})
            if(profile) {
                //update profile
                profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})
                return res.json(profile)
            }
            else {
                //create profile
                profile = new Profile(profileFields)
                await profile.save()
                return res.json(profile)
            }
        } catch(err) {
            console.error(err.message)
            res.status(500).send("Server error!")
        }
    }
)

// @route   GET api/profile
// @desc    Get all profile
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error!")
    }
})


// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar'])
        if(!profile) {
            return res.status(400).json({errors: [{msg: "Profile doesn't exist."}]})
        }
        res.json(profile)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error!")
    }
})


module.exports = router
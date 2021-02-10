const express = require('express')
const router = express.Router()
const axios = require('axios')
const config = require('config')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

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
        profileFields.skills = skills.split(',').map(skill => skill.trim())
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
                profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true, upsert: true})
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
// @desc    Get all profiles
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
            return res.status(404).json({errors: [{msg: "Profile doesn't exist."}]})
        }
        res.json(profile)
    } catch(err) {
        console.error(err.message)
        if(err.kind === 'ObjectId') {
            return res.status(404).json({errors: [{msg: "Profile doesn't exist."}]})
        }
        res.status(500).send("Server error!")
    }
})

// @route   DELETE api/profile
// @desc    Delete current user's profile, user and posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // TODO - remove posts
        //remove profile
        await Profile.findOneAndRemove({user: req.user.id})
        //remove user
        await User.findByIdAndRemove(req.user.id)
        res.json({msg: "User deleted"})
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error!")
    }
})

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('organization', 'Organization is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]],
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const { title, organization, location, from, to, current, description } = req.body

    const newExp = {
        title: title,
        organization: organization,
        location: location,
        from: from,
        to: to,
        current: current,
        description: description
    }

    try {
        const profile = await Profile.findOne({user: req.user.id})
        profile.experience.unshift(newExp)
        await profile.save()
        res.json(profile)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error!")
    }
})

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id})
        //remove experience
        const removeIndex = profile.experience.map(exp => exp.id).indexOf(req.params.exp_id)
        profile.experience.splice(removeIndex, 1)
        await profile.save()
        res.json(profile)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error!")
    }
})

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put('/education', [auth, [
    check('institution', 'Institution is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
    check('fieldOfStudy', 'Field of study is required').not().isEmpty()
]],
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const { institution, degree, fieldOfStudy, from, to, current, description } = req.body

    const newEdu = {
        institution: institution,
        degree: degree,
        fieldOfStudy: fieldOfStudy,
        from: from,
        to: to,
        current: current,
        description: description
    }

    try {
        const profile = await Profile.findOne({user: req.user.id})
        profile.education.unshift(newEdu)
        await profile.save()
        res.json(profile)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error!")
    }
})

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id})
        //remove education
        const removeIndex = profile.education.map(edu => edu.id).indexOf(req.params.edu_id)
        profile.education.splice(removeIndex, 1)
        await profile.save()
        res.json(profile)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error!")
    }
})

// @route   GET api/profile/github/:username
// @desc    Get user's repositories from GitHub
// @access  Public
router.get('/github/:username', async (req, res) => {
    try {
        const uri = encodeURI(
            `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
          );
          const headers = {
            'user-agent': 'node.js',
            Authorization: `token ${config.get('githubToken')}`
          }
          
          const gitHubResponse = await axios.get(uri, { headers })
          return res.json(gitHubResponse.data)
    } catch(err) {
        console.error(err.message)
        return res.status(404).json({errors: [{ msg: 'No Github profile found' }]})
    }
})

module.exports = router
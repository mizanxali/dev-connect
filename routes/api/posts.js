const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const Post = require('../../models/Post')
const User = require('../../models/User')

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', [auth, [
    check('text').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const user = await User.findById(req.user.id).select('-password')

        const { text } = req.body

        const post = new Post({
            user: req.user.id,
            text: text,
            name: user.name,
            avatar: user.avatar
        })

        const newPost = await post.save()

        res.json(newPost)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error!")
    }
})

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({date: -1})
        res.json(posts)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error!")
    }
})

// @route   GET api/posts/:post_id
// @desc    Get post by post ID
// @access  Private
router.get('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id)
        if(!post) {
            return res.status(404).json({errors: [{msg: "Post doesn't exist."}]})
        }
        res.json(post)
    } catch(err) {
        console.error(err.message)
        if(err.kind === 'ObjectId') {
            return res.status(404).json({errors: [{msg: "Post doesn't exist."}]})
        }
        res.status(500).send("Server error!")
    }
})

// @route   DELETE api/posts/:post_id
// @desc    Delete a post
// @access  Private
router.delete('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id)
        if(!post) {
            return res.status(404).json({errors: [{msg: "Post doesn't exist."}]})
        }

        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({errors: [{msg: "Not authorized to do that."}]})
        }
        await post.remove()
        res.json({msg: "Post deleted"})
    } catch(err) {
        console.error(err.message)
        if(err.kind === 'ObjectId') {
            return res.status(404).json({errors: [{msg: "Post doesn't exist."}]})
        }
        res.status(500).send("Server error!")
    }
})

module.exports = router
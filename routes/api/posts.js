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
    check('text', 'Text is required.').not().isEmpty()
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

        //check if user is deleting his own profile
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

// @route   PUT api/posts/:post_id/likes
// @desc    Like a post
// @access  Private
router.put('/:post_id/likes', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id)

        if(!post) {
            return res.status(404).json({errors: [{msg: "Post doesn't exist."}]})
        }

        //check if user has already liked the post
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({msg: "Post already liked."})
        }

        post.likes.unshift({user: req.user.id})
        await post.save()
        res.json(post.likes)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error!")
    }
})

// @route   PUT api/posts/:post_id/likes
// @desc    Unike a post
// @access  Private
router.put('/:post_id/unlike', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id)

        if(!post) {
            return res.status(404).json({errors: [{msg: "Post doesn't exist."}]})
        }

        //check if user has already liked the post
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({msg: "Post not liked yet."})
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeIndex, 1)
        await post.save()
        res.json(post.likes)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error!")
    }
})

// @route   POST api/posts/:post_id/comments
// @desc    Add a comment to a post
// @access  Private
router.post('/:post_id/comments', [auth, [
    check('text', 'Text is required.').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    
    try {
        const post = await Post.findById(req.params.post_id)
        if(!post) {
            return res.status(404).json({errors: [{msg: "Post doesn't exist."}]})
        }

        const user = await User.findById(req.user.id).select('-password')

        const { text } = req.body

        const comment = {
            user: req.user.id,
            text: text,
            name: user.name,
            avatar: user.avatar
        }

        post.comments.unshift(comment)
        await post.save()
        res.json(post.comments)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error!")
    }
})

// @route   DELETE api/posts/:post_id/comment/:comment_id
// @desc    Delete a comment from a post
// @access  Private
router.delete('/:post_id/comments/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id)
        if(!post) {
            return res.status(404).json({errors: [{msg: "Post doesn't exist."}]})
        }

        const comment = post.comments.find(comment => comment.id === req.params.comment_id)
        if(!comment) {
            return res.status(404).json({errors: [{msg: "Comment doesn't exist."}]})
        }

        //check if user is deleting his own comment
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({errors: [{msg: "Not authorized to do that."}]})
        }

        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)
        post.comments.splice(removeIndex, 1)

        await post.save()
        res.json(post.comments)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("Server error!")
    }
})

module.exports = router
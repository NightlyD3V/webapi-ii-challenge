const express = require('express');
const router = express.Router();

const Posts = require('./posts-model.js');

/* POST: /api/posts (root) */
router.post('/', async (req, res) => {
    try {
        const posts = await Posts.insert(req.body);
        res.status(200).json(posts.body);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error uploading your post'
        });
    }
});

/* POST: /api/posts/:id/comments */
router.post('/:id/comments', async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await Posts.insertComment(req.body);
        res.status(200).json(comments);
    } catch (err) {
        console.log(err);
    res.status(404).json({
        message: 'The post with the specified ID does not exist.'
    });
    }
});

/* GET: /api/posts (root) */
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error retrieving all posts'
        });
    }
});

/* GET: /api/posts/:id */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Posts.findById(id);
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'Post with that ID does not exist.'
        });
    }
});

/* GET: /api/posts/:id/comments */
router.get('/:id/comments', async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Posts.findCommentById(id);
        res.status(200).json(comment);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'Comment with that ID does not exist.'
        });
    }
});

/* DELETE: /api/posts/:id */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const removePost = await Posts.remove(id);
        res.status(200).json({
            removePost,
            message: `Deleted post: ${JSON.stringify(req.body)}`
        });
        }
    catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'Post with that ID does not exist.'
        });
    }
});

/* PUT: /api/posts/:id */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Posts.update(id);
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'Post with that ID does not exist.'
        });
    }
});

module.exports = router;
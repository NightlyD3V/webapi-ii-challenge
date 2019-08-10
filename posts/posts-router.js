const express = require('express');
const router = express.Router();

const Posts = require('./posts-model.js');

/* POST: /api/posts (root) */
router.post('/', async (req, res) => {
    try {
        const posts = await Posts.insert(req.body);
        res.status(200).json(posts);
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
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
    res.status(500).json({
        message: 'Error uploading comment'
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



module.exports = router;
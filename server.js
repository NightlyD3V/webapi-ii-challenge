//Globals
const express = require('express');
const server = express();
const PostsRouter = require('./posts/posts-router');

//Middleware
server.use(express.json());
server.use('/api/posts', PostsRouter);

//Base endpoint (async-await)
server.get('/', async (req, res) => {
    try {
    const response = await res.send('<h1>Lambda API Challenge</h1>');
    res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error retrieving server root'
        });
    }
});

server.listen(4000, () => {
    console.log('Server is listening on port 4000');
});

module.exports = server;
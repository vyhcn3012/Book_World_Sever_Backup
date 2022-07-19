'use strict';

const CommentController = require('../../controllers/CommentController');
const express = require('express'),
    router = express.Router();
router.get('/', (req, res) => {
    res.send('Welcome to the categories')
});
router.post('/postComment',CommentController.postComment);

module.exports = router;
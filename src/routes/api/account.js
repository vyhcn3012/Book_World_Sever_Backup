'use strict';
const express = require('express'),
    router = express.Router();
const AuthController = require( '../../controllers/AuthCotroller' );

router.get('/', (req, res) => {
    res.send('Welcome to the auth')
});

router.get('/allAuthor', AuthController.getAuthor);
router.get('/:id/getTimeRead', AuthController.getTimeRead);
router.get('/:id/allReadBooks', AuthController.getreadBooks);
router.get('/:id/getFavoriteBooks', AuthController.getFavoriteBooks);
router.get('/:id/getReadingBooks', AuthController.getReadingBooks);

router.post('/postChapterBought', AuthController.postChapterBought);

router.post('/postIdReadingBooks', AuthController.postIdReadingBooks);
router.post('/postFavoriteBooks', AuthController.postFavoriteBooks);
module.exports = router;
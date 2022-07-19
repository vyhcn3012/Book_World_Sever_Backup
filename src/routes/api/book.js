'use strict';
const bookController = require('../../controllers/BookController');
const AuthController = require( '../../controllers/AuthCotroller' );
const express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the books')
});

router.get('/getAllBook',bookController.getBooks);
router.get('/:id/getAllBookAuthor', bookController.getBookByIdAuthor);
router.post('/insertCommnet', bookController.insertComment);

router.get('/:id/getBookByIdCategory', bookController.getBookByIdCategory);
router.get('/getBooksByNumberRead', bookController.getBooksByNumberRead);
router.get('/:name/getBookByName', bookController.searchBook);

router.get('/:id/getChapterBook', bookController.getChapterBook);
router.get('/:id/getCommentChapter', bookController.getCommentChapters);

module.exports = router;
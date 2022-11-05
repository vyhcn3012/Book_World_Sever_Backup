
const express = require('express');
const AuthCotroller = require('../../controllers/AuthCotroller');
const BookController = require('../../controllers/BookController');
const ChapterController = require('../../controllers/ChapterController');
router = express.Router()

router.get('/them-sach', AuthCotroller.checkLogin, BookController.cpanel_insertBook);
router.get('/:id/them-chuong-sach', AuthCotroller.checkLogin, ChapterController.cpanel_insertChapterBook);

module.exports = router

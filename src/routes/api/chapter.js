'use strict';
const ChapterController = require( '../../controllers/ChapterController' );
const AuthController = require( '../../controllers/AuthCotroller' );
const express = require('express'),
    router = express.Router();

router.post("/insertChapterBook", AuthController.checkLogin, ChapterController.insertChapterBook);
module.exports = router;
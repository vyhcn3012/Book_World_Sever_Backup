var express = require('express');
const MediaController = require("../../controllers/MediaController");
var router = express.Router();
router.post('/uploadImage', MediaController.singleUpload, MediaController.createImage);
module.exports = router;
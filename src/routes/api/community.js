'use strict';
const CommunityController = require('../../controllers/CommunityController');
const express = require('express'),
    router = express.Router();
router.get('/', (req, res) => {
    res.send('Welcome to the categories')
});
router.get('/getAllCommunity',CommunityController.getAllCommunity);
router.get('/:account/getAllCommunityOfUser',CommunityController.getAllCommunityOfUser);
module.exports = router;
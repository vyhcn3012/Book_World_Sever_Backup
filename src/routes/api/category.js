'use strict';
const categoryController = require('../../controllers/CategoryController');
const express = require('express'),
    router = express.Router();
router.get('/', (req, res) => {
    res.send('Welcome to the categories')
});
router.get('/getAllCategories',categoryController.getCategories);
module.exports = router;
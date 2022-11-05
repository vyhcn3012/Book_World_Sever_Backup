'use strict';
const categoryController = require('../../controllers/CategoryController');
const express = require('express'),
    router = express.Router();
router.get('/', (req, res) => {
    res.send('Welcome to the categories')
});
router.get('/getAllCategories',categoryController.getCategories);
router.post('/insertCategory',categoryController.insertCategory);
router.post('/updateCategory',categoryController.updateCategory);
router.delete('/:id/deletCategory',categoryController.deletCategory);
module.exports = router;
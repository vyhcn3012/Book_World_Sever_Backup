
const express = require('express')
const bookController = require('../../controllers/BookController');
const categoryController = require('../../controllers/CategoryController');

router = express.Router()
router.get('/allBook', bookController.cpanel_getAllBook);
router.get('/insertBook', categoryController.cpanel_getAllCategories);
router.post('/allBook', bookController.cpanel_insertBook);
router.get('/:id/updateBook', bookController.cpanel_getbyIdBook);

module.exports = router

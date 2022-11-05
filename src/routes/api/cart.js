'use strict';
const AuthController = require( '../../controllers/AuthCotroller' );
const CartController = require('../../controllers/CartController');

const express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the books')
});


router.post('/purchaseCart',AuthController.checkLogin, CartController.createCart);


module.exports = router;
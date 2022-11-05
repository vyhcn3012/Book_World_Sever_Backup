'use strict';
const express = require('express'),
    router = express.Router();
const AuthController = require( '../../controllers/AuthCotroller' );
var multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
        'storage': storage,
        // 'storage': multer.memoryStorage(),
        'limits': {
            'fileSize': 1080 * 1920 * 5
        },
        fileFilter: function (req, file, callback) {
            const allowedExtensions = new RegExp(/.(jpg|png|jpeg|gif|mp3)$/gi);
            if (!allowedExtensions.test(file.originalname)) return callback(null, false);
            return callback(null, true);
        }
      });
const singleUpload = upload.single("file");
router.get('/', (req, res) => {
    res.send('Welcome to the auth')
});

router.get('/allAuthor', AuthController.getAuthor);
router.get('/getTimeRead', AuthController.checkLogin, AuthController.getTimeRead);
router.get('/:id/allReadBooks', AuthController.getreadBooks);
router.get('/:id/getFavoriteBooks', AuthController.getFavoriteBooks);
router.get('/:id/getReadingBooks', AuthController.getReadingBooks);
router.get('/:id/getDetailAuthor', AuthController.getDetailAuthor);
router.get('/:id/getReadTimeBook', AuthController.getReadTimeBook);
router.get('/getpurchaseCart',AuthController.checkLogin, AuthController.getpurchaseCart);

router.post('/postChapterBought', AuthController.postChapterBought);
router.post('/agreeAccess', AuthController.agreeAccess);
router.post('/refuseAccess', AuthController.refuseAccess);
router.post('/postIdReadingBooks', AuthController.postIdReadingBooks);
router.post('/postFavoriteBooks', AuthController.postFavoriteBooks);
router.post('/postFollowBooks', AuthController.postFollowBooks);

router.post('/registerNumberPhone', AuthController.insertNumberphone);
router.post('/loginNumberPhone', AuthController.loginNumberphone);
router.post('/changeReadTimeBook',AuthController.checkLogin, AuthController.changeReadTimeBook);
router.post('/accessAuthor',AuthController.checkLogin, AuthController.AccessAuthor);
router.post('/creatPaymentIntent', AuthController.creatPaymentIntent);
router.post('/getChangeProfile',[singleUpload],AuthController.checkLogin, AuthController.getChangeProfile);

router.get('/get-all-users-chat', AuthController.checkLogin, AuthController.getAllUsersChat);
module.exports = router;
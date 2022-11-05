const autoBind = require('auto-bind');
const { Controller } = require('../../system/controllers/Controller');
const { CartService } = require('../services/CartService');
const { Cart } = require('../models/Cart');
const { UserService } = require('../services/UserService');
const { Account } = require('../models/Account');

const cartService = new CartService(new Cart().getInstance());
const userService = new UserService(new Account().getInstance());
class CartController extends Controller{
    constructor(service) {
        super(service);
        autoBind(this);
    }
    async createCart(req, res, next) {
        try {
            const {idBook, idChapter, purchaseDate}=req.body;
            const idUser=req.account._id;
            const body = {
                idBook,
                idChapter,
                purchaseDate,
            }
            const response = await this.service.createCart(body);
            const data=response.data;
            await userService.purchaseCart(idUser,data._id);
            await res.status(response.statusCode).json(response);
        } catch (e) {
            // next(e);
        }
    }
}

module.exports = new CartController(cartService);
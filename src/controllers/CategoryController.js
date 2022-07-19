const autoBind = require('auto-bind');
const { Controller } = require('../../system/controllers/Controller');
const { Category } = require('../models/Category');
const { CategoryService } = require('../services/CategoryService');
const categoryService = new CategoryService(new Category().getInstance());

class CategoryController extends Controller {

    constructor(service) {
        super(service);
        autoBind(this);
    }


    async getCategories(req, res, next) {
        try {
            const response = await this.service.getAll({ limit: 1000 });

            await res.status(response.statusCode).json(response);
        } catch (e) {
            // next(e);
        }
    }
    async cpanel_getAllCategories(req, res, next){
        const allCategories = await this.service.cpanel_GetAll({ limit: 1000 });
        res.render('book/insertbook', {allCategories: allCategories});
        
    }
}

module.exports = new CategoryController(categoryService);
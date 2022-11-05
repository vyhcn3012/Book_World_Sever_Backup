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
            return res.status(response.statusCode).json(response);
        } catch (e) {
            // next(e);
        }
    }
    async cpanel_getAllCategories(req, res, next){
        const allCategories = await this.service.cpanel_GetAll({ limit: 1000 });
        res.render('book/insertbook', {allCategories: allCategories});
        
    }
    async getAllCategories_Cpanel(req, res, next){
        const allCategories = await this.service.cpanel_GetAll({ limit: 1000 });
        res.render('category/index', {allCategories: allCategories});
        
    }
    async insertCategories_Cpanel(req, res, next){
        res.render('category/insert');     
    }
    async updateCategories_Cpanel(req, res, next){
        const { id } = req.params;
      
        const response = await this.service.getDetailCategory(id);
        let data=response.data;
        res.render('category/update',{data:data,idCate:JSON.stringify(id)});     
    }
    async insertCategory(req, res, next) {
        try {
            const {body} = req;
            const response = await this.service.insertCategory(body);
            return res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }
    }
    async updateCategory(req, res, next) {
        try {
            const {body} = req;
            const response = await this.service.updateCategory(body);
            return res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }
    }
    async deletCategory(req, res, next) {
        try {
          const { id } = req.params;
          const response = await this.service.deletCategory(id);
          return res.status(response.statusCode).json(response);
        } catch (e) {
          console.log(e);
        }
      }
}

module.exports = new CategoryController(categoryService);
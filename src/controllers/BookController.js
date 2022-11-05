const autoBind = require('auto-bind');
const { Controller } = require('../../system/controllers/Controller');
const { Book } = require('../models/Book');
const { Chapter } = require('../models/Chapter');
const { Category } = require('../models/Category');
const { Comment } = require('../models/Comment');
const { BookService } = require('../services/BookService');
const {CategoryService} = require('../services/CategoryService');
const {AuthService} = require('../services/AuthService');
const {ChapterService} = require('../services/ChapterService');
const {CommentService} = require('../services/CommentService');

const chapterService = new ChapterService(new Chapter().getInstance());
const commentService = new CommentService(new Comment().getInstance());
const bookService = new BookService(new Book().getInstance());
const categoryService = new CategoryService(new Category().getInstance());

class BookController extends Controller{
    constructor(service) {
        super(service);
        autoBind(this);
    }
    async getBooks(req, res, next) {
        try {
            
            const response = await this.service.getAll({limit:1000});
            await res.status(response.statusCode).json(response);
        } catch (e) {
            // next(e);
        }
    }

    async getChapterBook(req, res, next) {
        try {
            const {id} = req.body;
            const idUser=req.account._id;
            const response = await chapterService.getChapterBook(id,idUser);
            await res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }
    }

    async getBooksByNumberRead(req, res, next) {
        try {
            const sortBy= {"numSumRead":-1};
            const response = await this.service.getAll({limit:1000,sortBy:sortBy });
            await res.status(response.statusCode).json(response);
        } catch (e) {
            // next(e);
        }
    }

    async searchBook(req, res, next) {
        try {
            const { name } = req.params;
            const response = await this.service.getAll({limit:1000,name:name});
            await res.status(response.statusCode).json(response);
        } catch (e) {
            // next(e);
        }
    }

    async insertBook(req, res, next) {
        try {
            const { body } = req;
            const { _id } = req.account;
            let { image, name, categoryId, introduction, isPrice} = body;
            const data = {
                image: image,
                name: name,
                categoryId: categoryId,
                introduction: introduction,
                isPrice: isPrice,
                account: _id,
                releasedDate: new Date(),
            }
            const response = await this.service.createBook(data);
            await res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }
    }
    
    async getBookByIdAuthor(req, res, next) {
        try {
            const { id } = req.params;
            const response = await this.service.getBookById(id);
            await res.status(response.statusCode).json(response);
        } catch (e) {
            // next(e);
        }
    }
    async getBookByIdCategory(req, res, next) {
        try {
            const { id } = req.params;
            const response = await this.service.getBookByIdCategory(id);

            await res.status(response.statusCode).json(response);
        } catch (e) {
            // next(e);
        }
    }

    async getCommentChapters(req, res, next) {
        try {
            const { id } = req.params;
            const response = await commentService.getCommentChapters(id);
            await res.status(response.statusCode).json(response);
        } catch (e) {
            // next(e);
        }
    }


    async insertComment(req, res, next) {
        try {
            const { post, userName, image, id, idChapter} = req.body;

            const data = {
                id: id,
                idChapter: idChapter,
                userName: userName,
                image: image,
                content: post,
                time: new Date(),
            }

            const response = await bookService.insertComment(data);
            await res.status(response.statusCode).json(response);
        } catch (e) {
            // next(e);
        }
    }

    async cpanel_getAllBook(req, res, next){
        const allBook = await this.service.cpanel_GetAll({ limit: 1000 });
      
        res.render('book/tablebook', {datas:allBook});
        
    }
    async cpanel_getbyIdBook(req, res, next){
      
        const { id }= req.params;
        const byIdBook = await this.service.cpanel_GetbyId(id);
        const categories = await CategoryController.getCategories();
        res.render('book/updatebook', {datas:byIdBook,categories:categories});
    }

    async cpanel_insertBook(req, res, next) {
        try {
            const categories= await categoryService.getAll();
            return res.render('author/insertBook', {categories:categories});  
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new BookController(bookService);
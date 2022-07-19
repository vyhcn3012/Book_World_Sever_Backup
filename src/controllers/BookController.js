const autoBind = require('auto-bind');
const { Controller } = require('../../system/controllers/Controller');
const { Book } = require('../models/Book');
const { Chapter } = require('../models/Chapter');
const { Comment } = require('../models/Comment');
const { BookService } = require('../services/BookService');
const CategoryController = require('./CategoryController');
const {AuthService} = require('../services/AuthService');
const {ChapterService} = require('../services/ChapterService');
const {CommentService} = require('../services/CommentService');

const chapterService = new ChapterService(new Chapter().getInstance());
const commentService = new CommentService(new Comment().getInstance());
const bookService = new BookService(new Book().getInstance());


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
            const {id} = req.params;
            const response = await chapterService.getChapterBook(id);
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
            console.log(name);
            await res.status(response.statusCode).json(response);
        } catch (e) {
            // next(e);
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
            console.log("=====> 49 ", response);
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
        const categories=await CategoryController.getCategories();
      
        res.render('book/updatebook', {datas:byIdBook,categories:categories});
    }
    async cpanel_insertBook(req, res, next) {
        try {
            // if (req.cookies && req.cookies.token) {
            //     console.log(req.cookies.token)
            //     res.redirect('/cpanel/events');
            //     return;
            // }
                let data = {
                    name: "name",
                    permission: false,
                    image:"sdada",
                    description:"sdasda",
                    linkPage:"hihi",
                    linkSound:"sound",
                }
                const response = await this.service.insert( data );
                // console.log(response);
                await res.status( 200 ).json( response );    
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new BookController(bookService);
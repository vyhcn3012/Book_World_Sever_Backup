const autoBind = require('auto-bind');
const { Controller } = require('../../system/controllers/Controller');
const { Book } = require('../models/Book');
const { Chapter } = require('../models/Chapter');
const { Category } = require('../models/Category');
const { Comment } = require('../models/Comment');
const { Account } = require('../models/Account');
const { Notification } = require('../models/Notification');
const { BookService } = require('../services/BookService');
const {CategoryService} = require('../services/CategoryService');
const {AuthService} = require('../services/AuthService');
const {ChapterService} = require('../services/ChapterService');
const {CommentService} = require('../services/CommentService');
const { NotificationService } = require('../services/NotificationService');
const { UserService } = require('../services/UserService');

const { JsonWebTokenError } = require('jsonwebtoken');

const userService = new UserService(new Account().getInstance());
const notificationService = new NotificationService(new Notification().getInstance());
const chapterService = new ChapterService(new Chapter().getInstance());
const commentService = new CommentService(new Comment().getInstance());
const bookService = new BookService(new Book().getInstance());
const categoryService = new CategoryService(new Category().getInstance());

class ChapterController extends Controller{
    constructor(service) {
        super(service);
        autoBind(this);
    }

    async insertChapterBook(req, res, next) {
        try {
            const {idBook, title, htmlChapter, permission} = req.body;
            const { _id } = req.account;

            const data = {
                idBook: idBook,
                title: title,
                htmlChapter: htmlChapter,
                permission: permission,
                releasedDate: new Date(),
            }
            const chapter = await chapterService.insertChapterBook(data);

            if(chapter){
                const dataNotificastion = {
                    book: idBook,
                    chapter: chapter.data._id,
                    content: "Tác giả mà bạn theo dõi đã thêm chương mới",
                    createdBy: _id,
                    createdAt: new Date(),
                }
                const notification = await notificationService.createNotification(dataNotificastion);
                
                if(notification){
                    const accounts = await userService.insertNotificationToUser(idBook, notification.data._id);
                    if(accounts){
                        const FCM = await userService.findFCMTokenById(accounts.data, notification.data._id, _id);
                    }
                }

            }   
            res.status(200).json(chapter);
        } catch (error) {
            next(error);
        }
    }

    async cpanel_insertChapterBook(req, res, next) {
        try {
            const {id} = req.params;
            const book = await bookService.get(id);
            return res.render('author/insertChapter', 
                {book : book,
                _book: JSON.stringify(book)});
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ChapterController(chapterService);
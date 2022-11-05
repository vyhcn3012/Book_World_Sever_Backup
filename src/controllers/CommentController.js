const autoBind = require('auto-bind');
const { Controller } = require('../../system/controllers/Controller');
const { Comment } = require('../models/Comment');
const { CommentService } = require('../services/CommentService');
const { UserService } = require('./../services/UserService');
const { Account } = require('./../models/Account');
const commentService = new CommentService(new Comment().getInstance());
const userService = new UserService(new Account().getInstance());
class CommentController extends Controller {

    constructor(service) {
        super(service);
        autoBind(this);
    }


    async postComment(req, res, next) {
        try {
            const { evaluate, idChapter, content, idUser } =req.body;
            const imageUser = await userService.findInfoById(idUser);
            const data={
                idChapter: idChapter,
                content: content,
                userName: idUser,
                evaluate: evaluate,
                image: imageUser.data.image,
               
            }
            const response = await this.service.insert(data);

            await res.status(response.statusCode).json(response);
        } catch (e) {
            // next(e);
        }
    }
    async getCommentChapters(req, res, next) {
        try {
            const { idChapter } =req.body;
            const response = await this.service.getCommentChapters(idChapter);
            await res.status(response.statusCode).json(response);
        } catch (e) {
            // next(e);
        }
    }
    
   
}

module.exports = new CommentController(commentService);
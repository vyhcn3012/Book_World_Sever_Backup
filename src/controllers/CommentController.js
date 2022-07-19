const autoBind = require('auto-bind');
const { Controller } = require('../../system/controllers/Controller');
const { Comment } = require('../models/Comment');
const { CommentService } = require('../services/CommentService');
const commentService = new CommentService(new Comment().getInstance());

class CommentController extends Controller {

    constructor(service) {
        super(service);
        autoBind(this);
    }


    async postComment(req, res, next) {
        try {
           const data={
                idChapter: req.body.idChapter,
                content: req.body.content,
                userName: req.body.idUser,
            }
            const response = await this.service.insert(data);

            await res.status(response.statusCode).json(response);
        } catch (e) {
            // next(e);
        }
    }
   
}

module.exports = new CommentController(commentService);
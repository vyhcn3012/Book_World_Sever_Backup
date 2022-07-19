'use strict';
const { Service } = require('../../system/services/Service');
const autoBind = require('auto-bind');
const config = require('../../config/config').getConfig();
const { HttpResponse } = require('../../system/helpers/HttpResponse');
const { UserBookService } = require('./UserBookService');
const { UserBook } = require('../models/UserBook');
const userBookService = new UserBookService(new UserBook().getInstance());

const request = require('request');

class UserService extends Service{
    constructor(model) {
        super(model);
        this.model = model;
        autoBind(this);
    }

    async insert(data) {
        //console.log("===> model", data);
        try {
            const item = await this.model.create(data);
            const account = await this.model
                .findById(item._id)
                .populate({
                    path: 'department',
                    populate: {
                        path: 'unit',
                        select: 'name _id'
                    }
                });

            if (account) {
                return (account);
            }
            throw new Error('Có lỗi, bạn có thể thử lại sau');
        } catch (errors) {
            //throw new Error('Có lỗi, bạn có thể thử lại sau', errors);;
        }
    }

    async getCountreadBook(id) {
        try {
            //$project: { count: { $size:"$historyBookRead" }}
            const readbook = await this.model.findById( id, { count: { $size:"$historyBookRead" } });
            if (!readbook) {
                const error = new Error('Không tìm thấy ');
                error.statusCode = 404;
                throw error;
            }
            console.log(id);
            return new HttpResponse( readbook);
        } catch (errors) {
            throw errors;
        }
    }

    async findByEmail(email) {  
        return this.model.findByEmail(email);
    }

    async getTimeRead(id) {
        try {
            const book = await this.model.find({'_id':id},{_id:0,timeReadBook: 1})  
            if (!book) {
                const error = new Error('Không tìm thấy cuốn sách này');
                error.statusCode = 404;
                throw error;
            }
         
            console.log(book);
            return new HttpResponse( book);
        } catch (errors) {
            throw errors;
        }
    }
    async getFavoriteBooks(id) {
        try {
            const book = await this.model.find({'_id':id},{_id:0,favoritebooks:1})
            .populate({
                path: 'favoriteBooks',
                populate: {
                    path: 'idBook',
                }   
            })

            console.log(">>>> 120 ", book);
            if (!book) {
                const error = new Error('Không tìm thấy cuốn sách này');
                error.statusCode = 404;
                throw error;
            }
         
            console.log(book);
            return new HttpResponse( book);
        } catch (errors) {
            throw errors;
        }
    }
    async postFavoriteBooks(id,idBook) {
        try {   
            const check=await this.model.find({'favoriteBooks.idBook':idBook});
            if (check.length === 0) {
                const book = await this.model.findByIdAndUpdate(id, {$push: {favoriteBooks: {idBook}}});
                return new HttpResponse( book);
            }
            return new HttpResponse("FF");
        } catch (errors) {
            throw errors;
        }
    }
    async getReadingBooks(id) {
        try {
            const book = await this.model.find({'_id':id},{_id:0,historyBookRead:1})
            .populate({
                path: 'historyBookRead',
                populate: {
                    path: 'idBook',
                }   
            })
            
            if (!book) {
                const error = new Error('Không tìm thấy cuốn sách này');
                error.statusCode = 404;
                throw error;
            }
         
            return new HttpResponse( book);
        } catch (errors) {
            throw errors;
        }
    }

    async postChapterBought(idUser, idChapter) {
        try{
            const check=await this.model.find({'payBook.idChapter':idChapter});
            if (check.length === 0) {
                let account = await this.model.findByIdAndUpdate(idUser, {$push: {payBook: {idChapter}}});
                return new HttpResponse(account);
            }
            if(!account){
                throw new Error('Tài khoản không tìm thấy');
            }
            throw new Error('Có lỗi, bạn có thể thử lại sau');
        }catch(e){
            throw e;
        }
    }

    async postIdReadingBooks(id,idBook) {
        try {
            const check=await this.model.find({'historyBookRead.idBook':idBook});
            if (!check) {
                const book = await this.model.findByIdAndUpdate(id, {$push: {historyBookRead: {idBook}}});
                console.log(book);
                return new HttpResponse( book);
            }
            return new HttpResponse("FF");
        } catch (errors) {
            throw errors;
        }
    }

    async findInfoById(_id){
        try {
            const account = await this.model.findById(_id);
            if (!account) {
                const error = new Error('Không tìm thấy tài khoản này');
                error.statusCode = 404;
                throw error;
            }
            return new HttpResponse( account);
        } catch (errors) {
            throw errors;
        }
    }

    async findInfoByEmail(_email){
        try{
            let account = await this.findByEmail(_email);
            if(!account){
                throw new Error('Tài khoản không tìm thấy');
            }

            const { _id ,name, email, phone, permission, fcmtokens, image, 
                bookmark, wallet, favoritebooks} = account;

            account = {
                _id ,name, email, phone, permission, fcmtokens, image, 
                bookmark, wallet, favoritebooks 
            }
        if (account) {
            return new HttpResponse(account);
        }
        throw new Error('Có lỗi, bạn có thể thử lại sau');
        } catch (e) {
            throw (e);
        }
    }

    async registerChapter(chapterId, userId, userEmail) {
        try {

            let oneChapter = await eventService.get(eventId);
            if (!oneChapter || !oneChapter.data.available) {
                throw new Error('Không tìm thấy chương truyện này');
            }
            oneChapter = oneChapter.data;

            const checkRegister = await userBookService.findByQuery({ event: eventId, user: userId, status: { $gte: config.USER_EVENT_STATUS.REGISTER } })
            if (checkRegister && checkRegister.length > 0) {
                return new HttpResponse(checkRegister[0]);
            }

            let userBook = {
                user: userId,
                chapter: chapterId,
                status: config.USER_BOOK_STATUS.REGISTER,
                available: true,
                createdAt: new Date(),
                createdBy: userId,
                updatedAt: new Date(),
                updatedBy: userId,
                registerAt: new Date(),
                notes: ''
            }

            const item = await userBookService.insert(userBook);

            if (item) {
                return new HttpResponse(item);
            }
            throw new Error('Có lỗi, bạn có thể thử lại sau');

        } catch (error) {
            console.log('>>>>>>>>>>>>user register event error: ', error)
            throw new Error(error.message || 'Có lỗi, bạn có thể thử lại sau');
        }
    }
}

module.exports = { UserService };
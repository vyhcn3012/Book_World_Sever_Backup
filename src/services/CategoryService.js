'use strict';
const { Service } = require('../../system/services/Service');
const autoBind = require('auto-bind');
const config = require('../../config/config').getConfig();
const { HttpResponse } = require("../../system/helpers/HttpResponse");
const request = require('request');

class CategoryService extends Service{
    constructor(model) {
        super(model);
        this.model = model;
        autoBind(this);
    }
    async cpanel_GetAll(query) {
        let { skip, limit, sortBy } = query;

        skip = skip ? Number(skip) : 0;
        limit = limit ? Number(limit) : 10;
        sortBy = sortBy ? sortBy : { 'createdAt': -1 };

        delete query.skip;
        delete query.limit;
        delete query.sortBy;

        // must call redis first

        try {
            const category = await this.model
                .find(query)
                .sort(sortBy)
                .skip(skip)
                .limit(limit)
               
            // console.log(deps)
            return category;
        } catch (errors) {
            throw errors;
        }

    }
    async insertCategory(body) {
        try {
            const {tentheloai,hinhAnh,moTa} = body;
            const data = {
                name:tentheloai, 
                image:hinhAnh,
                description:moTa,
            }       
           
            const item = await this.model.create( data );
            return new HttpResponse( item );          
        } catch ( error ) {
            throw new Error('Có lỗi, bạn có thể thử lại sau nhen');;
        }
    }
    async updateCategory(body) {
        try {
            const {id,tentheloai,hinhAnh,moTa} = body;
            const data = {
                name:tentheloai, 
                image:hinhAnh,
                description:moTa,
            }       
           
            const item = await this.model.findByIdAndUpdate( id,data );
            return new HttpResponse( item );          
        } catch ( error ) {
            throw new Error('Có lỗi, bạn có thể thử lại sau nhen');;
        }
    }

    async getAll() {
        try {
            const category = await this.model.find({});
            return new HttpResponse( category );
        } catch (errors) {
            throw errors;
        }
    }
    async getDetailCategory(id) {
        try {
            const item = await this.model.findById(id);
           
            if (!item) {
                const error = new Error("Không tìm thấy thể loại này");
                error.statusCode = 404;
                throw error;
              }
           
            return new HttpResponse( item );
        } catch ( error ) {
            throw new Error('Có lỗi, bạn có thể thử lại sau nhen');
        }
    }
    async deletCategory(id) {
        try {
           
            const item = await this.model.findByIdAndDelete(id);
            if (!item) {
                const error = new Error("Không tìm thấy nhà trọ này");
                error.statusCode = 404;
                throw error;
              }
           
            return new HttpResponse( item );
        } catch ( error ) {
            throw new Error('Có lỗi, bạn có thể thử lại sau nhen');
        }
    }

 
}

module.exports = { CategoryService };
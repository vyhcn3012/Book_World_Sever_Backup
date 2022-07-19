'use strict';
const { Service } = require('../../system/services/Service');
const autoBind = require('auto-bind');
const { HttpResponse } = require('../../system/helpers/HttpResponse');

const config = require('../../config/config').getConfig();

class UserBookService extends Service {
    constructor(model) {
        super(model);
        this.model = model;
        autoBind(this);
    }

    async findByQuery(query) {
        try {
            const item = await this.model.find(query);

            if (!item) {
                const error = new Error('Item not found');

                error.statusCode = 404;
                throw error;
            }

            return item;
        } catch (errors) {
            throw new Error('Có lỗi, bạn có thể thử lại sau');;
        }
    }
}

module.exports = { UserBookService };

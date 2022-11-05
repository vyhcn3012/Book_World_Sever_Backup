'use strict';
const { Service } = require('../../system/services/Service');
const autoBind = require('auto-bind');
const { HttpResponse } = require('../../system/helpers/HttpResponse');

const config = require('../../config/config').getConfig();

class MessageService extends Service {
    constructor(model) {
        super(model);
        this.model = model;
        autoBind(this);
    }

    async getMessages(from, to) {
        try {
            const messages = await this.model.find({
                users: {
                    $all: [from, to],
                },
                }).sort({ updatedAt: 1 });

            const projectedMessages = messages.map((msg) => {
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text,
                };
            });

            return new HttpResponse(projectedMessages);
        } catch (e){
            throw new Error('Có lỗi, bạn có thể thử lại sau');
        }
    }

    async sendMessage(from, to, message) {
        try {
            const data = await this.model.create({
                message: { text: message },
                accounts: [from, to],
                sender: from,
            });
            
            return new HttpResponse(data);
        } catch (e){
            console.log(e);
            throw new Error('Có lỗi, bạn có thể thử lại sau');
        }
    }
}

module.exports = { MessageService };

const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

class Notification {
    static instance = null;
    initSchema() {
        const schema = new Schema({
            'book': {
                'type': Schema.Types.ObjectId,
                'required': true,
                'ref': 'book'
            },
            'chapter': {
                'type': Schema.Types.ObjectId,
                'required': true,
                'ref': 'chapter'
            },
            'content':{
                'type': String,
                'required': false,
            },
            'createdBy': {
                'type': Schema.Types.ObjectId,
                'required': true,
                'ref': 'account'
            },
            'createdAt': {
                'type': Date,
                'required': false,
            }
        }, { 'timestamps': false } );
        schema.plugin(uniqueValidator);

        try {
            mongoose.model( 'notification', schema );
        } catch ( e ) {
           
        }
    }

    getInstance() {
        if (!Notification.instance) {
            this.initSchema();
            Notification.instance = mongoose.model( 'notification' );
        }        
        return Notification.instance;
    }
}

module.exports = { Notification };
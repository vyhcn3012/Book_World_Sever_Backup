const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

class Comment {
    static instance = null;
    initSchema() {
        const schema = new Schema({
            'idChapter': {
                'type': Schema.Types.ObjectId,
                'required': true,
                'ref': 'chapter'
            },
            'userName': {
                'type': String,
                'required': false,
            },
            'image': {
                'type': String,
                'required': false,
            },
            'content': {
                'type': String,
                'required': false,
            },
            'evaluate': {
                'type': Number,
                'required': false,
            },
            'time': {
                'type': Date,
                'required': false,
            },
        }, { 'timestamps': false } );
        schema.plugin(uniqueValidator);

        try {
            mongoose.model( 'comment', schema );
        } catch ( e ) {
           
        }
    } 
    getInstance() {
        if (!Comment.instance) {
            this.initSchema();
            Comment.instance = mongoose.model( 'comment' );
        }        
        return Comment.instance;
    }
}

module.exports = { Comment };
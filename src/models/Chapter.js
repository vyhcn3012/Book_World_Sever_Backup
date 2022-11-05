const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

class Chapter {
    static instance = null;
    initSchema() {
        const schema = new Schema({
            'idBook': {
                'type': Schema.Types.ObjectId,
                'required': true,
                'ref': 'book'
            },
            'title': {
                'type': String,
                'required': false,
            },
            'image': {
                'type': String,
                'required': false,
            },
            'releasedDate': {
                'type': Date,
                'required': false,
            },
            'htmlChapter': {
                'type': String,
                'required': false,
            },
            'linkAudio': {
                'type': String,
                'required': false,
            },
            'idComment': {
                'type': Schema.Types.ObjectId,
                'required': false,
                'ref': 'comment'
            },
            'permission': {
                'type': Number,
                'required': false,
            },
            'price': {
                'type': Number,
                'required': false,
            },
            'available': {
                'type': Boolean,
                'required': true,
                'default': false,
            },
            'chapterNumber': {
                'type': Number,
                'required': false,
            },
        }, { 'timestamps': false } );
        schema.plugin(uniqueValidator);

        try {
            mongoose.model( 'chapter', schema );
        } catch ( e ) {
           
        }
    }

    getInstance() {
        if (!Chapter.instance) {
            this.initSchema();
            Chapter.instance = mongoose.model( 'chapter' );
        }        
        return Chapter.instance;
    }
}

module.exports = { Chapter };
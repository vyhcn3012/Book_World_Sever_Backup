const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );

class Book {
    static instance = null;
    initSchema() {
        const schema = new Schema({
            'categoryId': {
                'type': Schema.Types.ObjectId,
                'required': false,
                'ref':'category'
            },
            'account': {
                'type': [{
                    '_id': {
                        'type': Schema.Types.ObjectId,
                        'required': false,
                    },
                    'permission': {
                        'type': Number,
                        'required': false,
                    },
                }],
                'required': false,
                'ref':'account'
            },
            'releasedDate': {
                'type': Date,
                'required': false,
            },
            'name': {
                'type': String,
                'required': false,
            },
            'image': {
                'type': String,
                'required': false,
            },
            'introduction': {
                'type': String,
                'required': false,
            },
            'overview': {
                'type': String,
                'required': true,
            },
            'numSumRead': {
                'type': Number,
                'required': false,          
            },
            'chapter': {
                'type': Schema.Types.ObjectId,
                'required': true,
                'ref': 'chapter'
            },
            'isPrice': {
                'type': Number,
                'required': false,
            },
           
        }, { 'timestamps': true } );

        schema.plugin( uniqueValidator );
        try {
            mongoose.model( 'book', schema );
        } catch ( e ) {
           
        }
    }

    getInstance() {
        if (!Book.instance) {
            this.initSchema();
            Book.instance = mongoose.model( 'book' );
        }        
        return Book.instance;
    }
}

module.exports = { Book };
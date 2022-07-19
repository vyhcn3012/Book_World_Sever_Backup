const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );

class UserBook {
    static instance = null;
    initSchema() {
        const schema = new Schema( {
            'user': {
                'type': Schema.Types.ObjectId,
                'required': true,
                'ref': 'account'
            },
            'chapter': {
                'type': Schema.Types.ObjectId,
                'required': true,
                'ref': 'chapter'
            },            
            'status': {
                'type': Number,
                'required': true,
            },
            'available': {
                'type': Boolean,
                'required': true,
                'default': true
            },  
            'notes': {
                'type': String,
                'required': false,
            },
            'registerAt': {
                'type': Date,
                'required': false,
            },
            'checkinAt': {
                'type': Date,
                'required': false,
            },
            'checkoutAt': {
                'type': Date,
                'required': false,
            },
            'createdAt': {
                'type': Date,
                'required': false,
            },
            'createdBy': {
                'type': Schema.Types.ObjectId,
                'required': true,
                'ref': 'user'
            },
            'updatedAt': {
                'type': Date,
                'required': false,
            },
            'updatedBy': {
                'type': Schema.Types.ObjectId,
                'required': true,
                'ref': 'user'
            },
        }, { 'timestamps': true } );
        
        schema.plugin( uniqueValidator );
        try {
            mongoose.model( 'userBook', schema );
        } catch ( e ) {

        }

    }

    getInstance() {
        if (!UserBook.instance) {
            this.initSchema();
            UserBook.instance = mongoose.model( 'userBook' );
        }        
        return UserBook.instance;
    }
}

module.exports = { UserBook };

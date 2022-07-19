const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );

class Contribute {
    static instance = null;
    initSchema() {
        const schema = new Schema({
            'userId': {
                'type': Schema.Types.ObjectId,
                'required': true,
                'ref':'user',
            },
            'bookId': {
                'type': Schema.Types.ObjectId,
                'required': true,  
                'ref':'book',        
            },
            'content': {
                'type': String,
                'required': true,          
            },
            'image': {
                'type': String,
                'required': true,          
            },
        }, { 'timestamps': true } );

        schema.plugin( uniqueValidator );
        try {
            mongoose.model( 'contribute', schema );
        } catch ( e ) {
            throw e;
        }
    }

    getInstance() {
        if (!Contribute.instance) {
            this.initSchema();
            Contribute.instance = mongoose.model( 'contribute' );
        }        
        return Contribute.instance;
    }
}

module.exports = { Contribute };
const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );

class Media {
    static instance = null;
    initSchema() {
        const schema = new Schema({
            'imageName': {
                'type': String,
                'required': true,
            },
            'imageId': {
                'type': String,
                'required': false,          
            },
            'imageUrl': {
                'type': String,
                'required': false,          
            },
        }, { 'timestamps': true } );

        schema.plugin( uniqueValidator );
        try {
            mongoose.model( 'media', schema );
        } catch ( e ) {
            throw e;
        }
    }

    getInstance() {
        if (!Media.instance) {
            this.initSchema();
            Media.instance = mongoose.model( 'media' );
        }        
        return Media.instance;
    }
}

module.exports = { Media };
const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );

class Category {
    static instance = null;
    initSchema() {
        const schema = new Schema({
            'name': {
                'type': String,
                'required': true,
            },
            'image': {
                'type': String,
                'required': true,          
            },
            'description': {
                'type': String,
                'required': false,          
            },
        }, { 'timestamps': true } );

        schema.plugin( uniqueValidator );
        try {
            mongoose.model( 'category', schema );
        } catch ( e ) {
            throw e;
        }
    }

    getInstance() {
        if (!Category.instance) {
            this.initSchema();
            Category.instance = mongoose.model( 'category' );
        }        
        return Category.instance;
    }
}

module.exports = { Category };
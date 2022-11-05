const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );

class Message {
    static instance = null;
    initSchema() {
        const schema = new Schema({
            'message': {
                'text': { type: String, required: true },
            },
            accounts: Array,
            'sender':{
                'type': Schema.Types.ObjectId,
                'required': true,
                'ref':'account',
            },
        }, { 'timestamps': true } );

        schema.plugin( uniqueValidator );
        try {
            mongoose.model( 'message', schema );
        } catch ( e ) {
            throw e;
        }
    }

    getInstance() {
        if (!Message.instance) {
            this.initSchema();
            Message.instance = mongoose.model( 'message' );
        }        
        return Message.instance;
    }
}

module.exports = { Message };
const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );

class Community {
    static instance = null;
    initSchema() {
        const schema = new Schema({
            'account': {
                'type': Schema.Types.ObjectId,
                'required': true,
                'ref':'account'
            },
            'name': {
                'type': String,
                'required': true,
            },
            'image': {
                'type': String,
                'required': true,
            },
            'describe': {
                'type': String,
                'required': true,
            },
            'numMember': {
                'type': Number,
                'required': true,
            },
            'message': {
                'type': [{
                    '_id': {
                        'type': Schema.Types.ObjectId,
                        'required': true,
                    },
                    'text': {
                        'type': String,
                        'required': true,
                    },
                    'image': {
                        'type': String,
                        'required': true,
                    },
                    'video': {
                        'type': String,
                        'required': true,
                    },
                    'time': {
                        'type': Date,
                        'required': true,
                    },
                }],
                'required': true,
            },
            'dateReleased': {
                'type': Date,
                'required': true,
            },
        }, { 'timestamps': true } );

        schema.plugin( uniqueValidator );
        try {
            mongoose.model( 'community', schema );
        } catch ( e ) {
            throw e;
        }
    }

    getInstance() {
        if (!Community.instance) {
            this.initSchema();
            Community.instance = mongoose.model( 'community' );
        }        
        return Community.instance;
    }
}

module.exports = { Community };
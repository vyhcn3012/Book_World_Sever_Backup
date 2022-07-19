const mongoose = require( 'mongoose' );
const { Schema } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );

class Account {
    static instance = null;
    initSchema() {
        const schema = new Schema({
            'name': {
                'type': String,
                'required': true,
            },
            'email': {
                'type': String,
                'required': true,
            },
            'phone': {
                'type': String,
                'required': false,
            },
            'permission': {
                'type': String,
                'required': true,
            },
            'fcmtokens': {
                'type': [{
                    'type': String,
                    'required': false,
                }],
                'required': false,
            },
            'image': {
                'type': String,
                'required': false,
            },
            'bookmark': {
                'type': String,
                'required': false,          
            },
            'wallet': {
                'type': Number,
                'required': true,          
            },
            'favoriteBooks': {
                'type': [{
                    'idBook': {
                        'type': Schema.Types.ObjectId,
                        'required': true,
                        'ref':'book'
                    },
                }],
                'required': false,
            },
            'password': {
                'type': String,
                'required': false,
            },
            'status':{
                'type': String,
                'required': false,
            },
            'birthday':{
                'type': Date,
                'required': false,
            },
            'overview':{
                'type': String,
                'required': false,
            },
            'aboutAuthor':{
                'type': String,
                'required': false,
            },
            'notification':{
                'type': String,
                'required': false,
            },
            'bookmark':{
                'type': String,
                'required': false,
            },
            'favoriteAuthor':{
                'type': String,
                'required': false,
            },
            'address':{
                'type': String,
                'required': false,
            },
            'historyBookRead':{
                'type': [{
                    'idBook': {
                        'type': Schema.Types.ObjectId,
                        'required': true,
                        'ref':'book'
                    },
                    'time': {
                        'type': String,
                        'required': false,
                    },
                }],
                'required': false,
            },
            'payBook': {
                'type': [
                    {
                        'idChapter': {
                            'type': Schema.Types.ObjectId,
                            'required': true,
                            'ref':'chapter'
                        },
                    }
                ],
                'required': false,
            },
            'timeReadBook':{
                'type': String,
                'required': false,
            }
        }, { 'timestamps': true } );

        schema.statics.findByEmail = function( email ) {
            return this.findOne( { 'email': email } );
        };
        schema.plugin( uniqueValidator );
        try {
            mongoose.model( 'account', schema );
        } catch ( e ) {
            throw e;
        }
    }

    getInstance() {
        if (!Account.instance) {
            this.initSchema();
            Account.instance = mongoose.model( 'account' );
        }        
        return Account.instance;
    }
}

module.exports = { Account };
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

class Account {
    static instance = null;
    initSchema() {
        const schema = new Schema(
            {
                name: {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: true,
                },
                phone: {
                    type: String,
                    required: false,
                },
                permission: {
                    type: String,
                    required: true,
                },
                fcmtokens: {
                    type: [
                        {
                            type: String,
                            required: false,
                        },
                    ],
                    required: false,
                },
                image: {
                    type: String,
                    required: false,
                },
                bookmark: {
                    type: String,
                    required: false,
                },
                wallet: {
                    type: Number,
                    required: true,
                },
                favoriteBooks: {
                    type: [
                        {
                            idBook: {
                                type: Schema.Types.ObjectId,
                                required: false,
                                ref: "book",
                            },
                        },
                    ],
                    required: false,
                },

                followBooks: {
                    type: [
                        {
                            idBook: {
                                type: Schema.Types.ObjectId,
                                required: true,
                                ref: "book",
                            },
                        },
                    ],
                    required: false,
                },
                password: {
                    type: String,
                    required: false,
                },
                passwordUser: {
                    type: String,
                    required: false,
                },
                status: {
                    type: String,
                    required: false,
                },
                birthday: {
                    type: Date,
                    required: false,
                },
                overview: {
                    type: String,
                    required: false,
                },
                role: {
                    type: Number,
                    required: true,
                    default: 1,
                },
                aboutAuthor: {
                    type: String,
                    required: false,
                },
                notification: {
                    type: [
                        {
                            type: Schema.Types.ObjectId,
                            required: false,
                            ref: "notification",
                        },
                    ],
                    required: false,
                },
                bookmark: {
                    type: String,
                    required: false,
                },
                favoriteAuthor: {
                    type: String,
                    required: false,
                },
                address: {
                    type: String,
                    required: false,
                },
                historyBookRead: {
                    type: [
                        {
                            idBook: {
                                type: Schema.Types.ObjectId,
                                required: true,
                                ref: "book",
                            },
                            time: {
                                type: String,
                                required: false,
                            },
                        },
                    ],
                    required: false,
                },
                authorAcess: {
                    type: Number,
                    required: false,
                    default: 1,
                },
                payBook: {
                    type: [
                        {
                            idChapter: {
                                type: Schema.Types.ObjectId,
                                required: true,
                                ref: "chapter",
                            },
                        },
                    ],
                    required: false,
                },
                timeReadBook: {
                    type: [
                        {
                            createYear: {
                                type: Number,
                                required: true,
                            },
                            details: {
                                type: [
                                    {
                                        month: {
                                            type: String,
                                            required: true,
                                        },
                                        time: {
                                            type: Number,
                                            required: true,
                                        },
                                    },
                                ],
                                required: false,
                            },
                        },
                    ],
                    required: true,
                    default: [],
                },
                purchaseHistory: {
                    type: [
                        {
                            idCart: {
                                type: Schema.Types.ObjectId,
                                required: true,
                                ref: "cart",
                            },
                        },
                    ],
                    required: false,
                },
                typeLogin: {
                    type: String,
                    required: false,
                },
            },
            { timestamps: true }
        );

        schema.statics.findByEmail = function (email) {
            return this.findOne({ email: email });
        };
        schema.plugin(uniqueValidator);
        try {
            mongoose.model("account", schema);
        } catch (e) {
            throw e;
        }
    }

    getInstance() {
        if (!Account.instance) {
            this.initSchema();
            Account.instance = mongoose.model("account");
        }
        return Account.instance;
    }
}

module.exports = { Account };

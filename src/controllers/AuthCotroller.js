const { AuthService } = require("./../services/AuthService");
const { UserService } = require("./../services/UserService");
const config = require("../../config/config").getConfig();
const { Auth } = require("./../models/Auth");
const { Account } = require("./../models/Account");
const authService = new AuthService(
    new Auth().getInstance(),
    new Account().getInstance()
);
const userService = new UserService(new Account().getInstance());
const stripe = require("stripe")(
    "sk_test_51LksFaBV28KdDJtDghRwcFhArVGvyu9jl05AZt3xHUOxY8C9FQ1NlIAZv7XxtQopv6pBDpZB3hYHVc7zGB13KNxS00BwXKTRh7"
);
const autoBind = require("auto-bind");
const bcrypt = require("bcryptjs");
const { MediaService } = require("../services/MediaService");
const { OAuth2Client } = require("google-auth-library"),
    client = new OAuth2Client(config.GOOGLE_CLIENT_ID);
class AuthCotroller {
    constructor(service) {
        this.service = service;
        autoBind(this);
    }

    async login(req, res, next) {
        try {
            const { token, token_fcm } = req.body;
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: config.GOOGLE_CLIENT_ID,
            });
            const { name, email, picture } = ticket.getPayload();
            const check_email = config.EMAIL_GOOGLE_TESTING;
            const body = {
                email: email,
                name: name,
                image: picture,
                phone: " ",
                permission: "author",
                bookmark: "",
                wallet: 0,
                favoritebooks: "",
                token_fcm: token_fcm,
            };
            const response = await authService.login(body);
            await res.status(response.statusCode).json(response);
        } catch (e) {
            console.log(">>>>>>132 login error: " + e);
            next(e);
        }
    }

    async getAuthor(req, res, next) {
        try {
            //console.log("getAuthor" + userService.getAll);
            const response = await userService.getAll({ limit: 1000 });
            const data = response.data.filter((x) => x.permission === "author");
            res.status(response.statusCode).json(data);
        } catch (e) {
            // next(e);
        }
    }
    async getDetailAuthor(req, res, next) {
        try {
            const { id } = req.params;
            const response = await userService.get(id);
            res.status(response.statusCode).json(response);
        } catch (e) {
            // next(e);
        }
    }
    async getTimeRead(req, res, next) {
        try {
            const { id } = req.account;
            const response = await userService.getTimeRead(id);
            await res.status(response.statusCode).json(response);
        } catch (e) {
            // next(e);
        }
    }

    async changeReadTimeBook(req, res, next) {
        try {
            const idUser = req.account._id;
            const { body } = req;
            const response = await userService.changeReadTimeBook(idUser, body);
            await res.status(response.statusCode).json(response);
        } catch (e) {
            // next(e);
        }
    }

    async getReadTimeBook(req, res, next) {
        try {
            const { id } = req.params;
            const response = await userService.getReadTimeBook(id);
            await res.status(response.statusCode).json(response);
        } catch (e) {
            // next(e);
        }
    }

    async getreadBooks(req, res, next) {
        try {
            const { id } = req.params;
            const response = await userService.getCountreadBook(id);
            await res.status(response.statusCode).json(response);
        } catch (errors) {
            throw errors;
        }
    }
    async getFavoriteBooks(req, res, next) {
        try {
            const { id } = req.params;
            const response = await userService.getFavoriteBooks(id);
            await res.status(response.statusCode).json(response);
        } catch (errors) {
            throw errors;
        }
    }

    async getReadingBooks(req, res, next) {
        try {
            const { id } = req.params;
            const response = await userService.getReadingBooks(id);
            await res.status(response.statusCode).json(response);
        } catch (errors) {
            throw errors;
        }
    }

    async getPayBook(req, res, next) {
        try {
            const { id } = req.params;
            const response = await userService.getPayBook(id);
            await res.status(response.statusCode).json(response);
        } catch (errors) {
            throw errors;
        }
    }

    async postIdReadingBooks(req, res, next) {
        try {
            const { id, idBook } = req.body;
            const response = await userService.postIdReadingBooks(id, idBook);
            await res.status(response.statusCode).json(response);
        } catch (errors) {
            throw errors;
        }
    }

    async postChapterBought(req, res, next) {
        try {
            const { idUser, idChapter } = req.body;
            const response = await userService.postChapterBought(
                idUser,
                idChapter
            );
            await res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }
    }

    async postFavoriteBooks(req, res, next) {
        try {
            const { id, idBook } = req.body;
            const response = await userService.postFavoriteBooks(id, idBook);
            await res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }
    }

    async postFollowBooks(req, res, next) {
        try {
            const { id, idBook } = req.body;
            const response = await userService.postFollowBooks(id, idBook);
            await res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const token = this.extractToken(req);
            const { fcmtoken } = req.body;
            req.account = await this.service.checkLogin(token);
            const response = await this.service.logout(
                token,
                fcmtoken,
                req.account
            );
            await res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }
    }

    async checkLogin(req, res, next) {
        try {
            const token = this.extractToken(req);
            const response = await this.service.checkLogin(token);
            req.account = response;
            req.authorized = true;
            req.token = token;
            next();
        } catch (e) {
            next(e);
        }
    }

    extractToken(req) {
        if (
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
            return req.headers.authorization.split(" ")[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        } else if (req.cookies && req.cookies.token) {
            return req.cookies.token;
        }
        return null;
    }

    async creatPaymentIntent(req, res, next) {
        try {
            const { amount, currency } = req.body;
            const payableAmount = parseInt(amount) * 100;
            const paymentIntent = await stripe.paymentIntents.create({
                amount: payableAmount,
                currency: currency, // put your currency
            });
            const clientSecret = await paymentIntent.client_secret;
            await res.status(200).json({ clientSecret });
        } catch (e) {
            next(e);
        }
    }

    async indexUser_Cpanel(req, res, next) {
        try {
            const { id } = req.params;
            if (id == 1) {
                const response = await userService.getAll({ limit: 1000 });

                res.render("user/index", {
                    data: response.data,
                    idData: JSON.stringify(id),
                });
            } else if (id == 2) {
                const response = await userService.findauthorAcess(id);

                res.render("user/indexAccess", {
                    data: response.data,
                    idData: JSON.stringify(id),
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
    async agreeAccess(req, res, next) {
        try {
            const { idUser } = req.body;
            const response = await userService.agreeAccess(idUser);
            return res.status(response.statusCode).json(response);
        } catch (e) {
            console.log(e);
        }
    }
    async AccessAuthor(req, res, next) {
        try {
            const { _id } = req.account;
            const response = await userService.AccessAuthor(_id);
            return res.status(response.statusCode).json(response);
        } catch (e) {
            console.log(e);
        }
    }
    async refuseAccess(req, res, next) {
        try {
            const { idUser } = req.body;
            const response = await userService.refuseAccess(idUser);
            return res.status(response.statusCode).json(response);
        } catch (e) {
            console.log(e);
        }
    }
    async insertNumberphone(req, res, next) {
        try {
            const { body } = req;
            const response = await userService.insertNumberphone(body);
            return res.status(response.statusCode).json(response);
        } catch (e) {
            console.log(e);
        }
    }
    async loginNumberphone(req, res, next) {
        try {
            const { body } = req;
            const { passwordUser } = req.body;
            const response = await authService.loginNumberphone(body);
            const checkPassword = await bcrypt.compare(
                passwordUser,
                response.data.account.passwordUser
            );
            if (checkPassword) {
                return res.status(response.statusCode).json(response);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getAllUsersChat(req, res, next) {
        try {
            const { _id } = req.account;
            console.log(_id);
            const response = await userService.getAllUsersChat(_id);
            return res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }
    }

    async getpurchaseCart(req, res, next) {
        try {
            const idUser = req.account._id;
            const response = await userService.getpurchaseCart(idUser);
            await res.status(response.statusCode).json(response);
        } catch (e) {
            console.log(e);
        }
    }
    async getChangeProfile(req, res, next) {
        try {
            const idUser = req.account._id;
            const { name } = req.body;
            const urlImage = await userService.createImage(req.file);
            const data = {
                image: urlImage.data.url,
                name,
            };
            const response = await userService.getChangeProfile(idUser, data);
            await res.status(response.statusCode).json(response);
        } catch (e) {
            console.log(e);
        }
    }

    async creatAudio(req, res, next) {
        try {
            const idUser = req.account._id;
            const { name } = req.body;

            const urlImage = await userService.createAudio(req.file);

            const data = {
                image: urlImage.data.url,
                name,
            };
            const response = await userService.getChangeProfile(idUser, data);
            await res.status(response.statusCode).json(response);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new AuthCotroller(authService);

const { AuthService } = require("../services/AuthService");
const { UserService } = require("../services/UserService");
const { Auth } = require("../models/Auth");
const { Account } = require("../models/Account");
const config = require("../../config/config").getConfig();
const autoBind = require("auto-bind");
const google = require("googleapis").google,
  OAuth2 = google.auth.OAuth2;
const { OAuth2Client } = require("google-auth-library"),
  client = new OAuth2Client(config.GOOGLE_CLIENT_ID);
const authService = new AuthService(
  new Auth().getInstance(),
  new Account().getInstance()
);
const userService = new UserService(new Account().getInstance());

const request = require("request");

class CPanelController {

  constructor() {
      autoBind(this);
  }

  async index(req, res, next) {
      try {
          res.render('index');
      } catch (e) {
          console.log(e);
      }
  }

  auth(req, res, next) {
      const oauth2Client = new OAuth2(config.GOOGLE_CLIENT_ID, config.GOOGLE_CLIENT_SECRET, config.GOOGLE_REDIRECT_URL);
      const authLink = oauth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: config.GOOGLE_SCOPE,
          prompt: 'consent'
      });
      res.redirect(authLink);
  }

  callback(req, res, next) {
      try {
          const oauth2Client = new OAuth2(config.GOOGLE_CLIENT_ID, config.GOOGLE_CLIENT_SECRET, config.GOOGLE_REDIRECT_URL);
          if (req.query.error) {
              res.redirect('/auth');
          } else {
              oauth2Client.getToken(req.query.code, async function (err, token) {
                  if (err) res.redirect('/');
                  else {
                      const ticket = await client.verifyIdToken({
                          idToken: token.id_token,
                          audience: config.GOOGLE_CLIENT_ID
                      });

                      console.log(token.id_token);
                      const { name, email, picture } = ticket.getPayload();

                        const body = {
                          email: email,
                          //role: config.USER_ROLE.EMPLOYEE,
                          name: name,
                          image: picture,
                          phone: " ",
                          permission: "author",
                          bookmark: "",
                          wallet: 0,
                          favoritebooks: "",
                        };
                        const account = await authService.login(body);
                        console.log(account);
    
                        res.cookie("token", account.data.token, {
                          expires: new Date(Date.now() + config.COOKIE_TOKEN_LIFETIME),
                          httpOnly: true,
                        });
                        res.redirect('/cpanel/users/1/allUser');
                  
                  }
              });
          }
      } catch (e) {
          next(e);
      }
  }

  async logout(req, res, next) {
      try {

          const { token } = req;
          await authService.logout(token);
          res.clearCookie('token');
          res.redirect('/auth');
      } catch (e) {
          console.log(e);
      }
  }
}

module.exports = new CPanelController();

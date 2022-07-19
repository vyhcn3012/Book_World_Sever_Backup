const { AuthService } = require("../services/AuthService");
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
const request = require("request");

class CPanelController {
  constructor() {
    autoBind(this);
  }

  async index(req, res, next) {
    try {
      res.render("index");
    } catch (e) {
      console.log(e);
    }
  }

auth(req, res, next) {
    if (req.cookies && req.cookies.token) {
      console.log(req.cookies.token);
      return;
    }
    const { campus_code } = req.body;
    const oauth2Client = new OAuth2(
      config.GOOGLE_CLIENT_ID,
      config.GOOGLE_CLIENT_SECRET,
      config.GOOGLE_REDIRECT_URL
    );
    const authLink = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: config.GOOGLE_SCOPE,
      prompt: "consent",
    });
    res.cookie("campus_code", campus_code);
    res.redirect(authLink);
  }

  auth_callback(req, res, next) {
    try {
      const oauth2Client = new OAuth2(
        config.GOOGLE_CLIENT_ID,
        config.GOOGLE_CLIENT_SECRET,
        config.GOOGLE_REDIRECT_URL
      );
      if (req.query.error) {
        res.redirect("/cpanel/home");
      } else {
        oauth2Client.getToken(req.query.code, async function (err, token) {
          if (err) res.redirect("/");
          else {
            //console.log("token id", token.id_token);
            const ticket = await client.verifyIdToken({
              idToken: token.id_token,
              audience: config.GOOGLE_CLIENT_ID,
            });
            const { name, email, picture } = ticket.getPayload();
            console.log("idToken ", token.id_token);
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
            // console.log(user)
            res.cookie("token", account.data.token, {
              expires: new Date(Date.now() + config.COOKIE_TOKEN_LIFETIME),
              httpOnly: true,
            });
            res.redirect('/cpanel/home');
          }
        });
      }
    } catch (e) {
      console.log(">>>>>>: ", e);
      next(e);
    }
  }
}

module.exports = new CPanelController();

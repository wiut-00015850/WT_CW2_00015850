require('dotenv').config();  // needed to read secrets from .env file
const jwt = require('jsonwebtoken');  // needed to authorize users

class AuthService {
  _secret_token = process.env.ACCESS_TOKEN_SECRET;

  authenticateAdminToken= (req, res, next) => {
    const token = req.cookies.ExpressEvents_JWT;  // cookie the app adds after login or sign up steps
    if (token == null)
      return res.render('login'); // no token, ask user to log in
    jwt.verify(token, this._secret_token, (err, user) => {
      if (err || !user || !user.isAdmin)
      // if there was an error, or user does not have admin right, show unauthorized page
        return res.redirect('/user/unauthorized');
      next();  // everything is good, requsted passed the middleware and can proceed with the next middleware
    });
  }

  generateUserToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  }

  isUserAdmin(req) {
    const token = req.cookies.ExpressEvents_JWT;  // cookie the app adds after login or sign up steps
    if (token == null)
      return false;
    return jwt.verify(token, this._secret_token, (err, user) => {
      if (err || !user || !user.isAdmin)
        return false;
      return true;
    });
  }
}

module.exports = AuthService;

const UsersService = require('./../services/users_service');
const usersService = new UsersService();

class UsersController {
  _cookie_name = 'ExpressEvents_JWT';

  showLoginPage(req, res) {
    res.render('login');
  }

  showSignUpPage(req, res) {
    res.render('signup');
  }

  login = async (req, res) => {
    const { username, password } = req.body;
    const result = await usersService.login(username, password);
    if (result.success) {
      res.cookie(this._cookie_name, result.token);
      res.sendStatus(200);
    }
    else
      res.status(400).json({ errorMsg: result.errorMsg });
  }

  // clear cookie and go to home page
  logout = async (req, res) => {
    res.clearCookie(this._cookie_name);
    res.render('index');
  }

  showUnauthorized(req, res) {
    res.render('unauthorized');
  }

  signup = async (req, res) => {
    const { username, password, isAdmin } = req.body;
    const result = await usersService.signup(username, password, isAdmin);
    if (result.success) {
      res.cookie(this._cookie_name, result.token);
      res.sendStatus(200);
    }
    else 
      res.status(400).json({  errorMsg: result.errorMsg });
  }

}

module.exports = UsersController;
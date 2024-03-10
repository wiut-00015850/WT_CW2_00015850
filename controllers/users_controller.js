const UsersService = require('./../services/users_service');
const usersService = new UsersService();

class UsersController {

  showLoginPage(req, res) {
    res.render('login');
  }

  showSignUpPage(req, res) {
    res.render('signup');
  }

  async login(req, res) {
    const { username, password } = req.body;
    console.log(username, password);
    const result = await usersService.login(username, password);
    if (result.success)
      res.sendStatus(200);
    else
      res.status(400).json({ errorMsg: result.errorMsg });
  }

  logout(req, res) {
    console.log('logging out');
  }

  async signup(req, res) {
    const { username, password, isAdmin } = req.body;
    const result = await usersService.signup(username, password, isAdmin);
    if (result.success)
      res.sendStatus(200);
    else 
      res.status(400).json({  errorMsg: result.errorMsg });
  }

}

module.exports = UsersController;
const express = require('express');
const UsersController = require('./../controllers/users_controller');

const router = express.Router();
const usersController = new UsersController();

// to accept body in from the form
router.use(express.json());

router.route('/login')
  .get(usersController.showLoginPage)
  .post(usersController.login);

router.get('/logout', usersController.logout);

router.get('/unauthorized', usersController.showUnauthorized);

router.route('/signup')
  .get(usersController.showSignUpPage)
  .post(usersController.signup);

module.exports = router;

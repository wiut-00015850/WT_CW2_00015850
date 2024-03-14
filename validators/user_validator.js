// a helper class that validates User entity
class UserValidator {
  validateUser(username, password) {
    if (username.trim() === '' || password === '')
      return { success: false, errorMsg: 'Username and password cannot be empty'};
    return { success: true, errorMsg: '' }
  }
}

module.exports = UserValidator;
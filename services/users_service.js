// a service class that will perform CRUD operations on users.json
const fs = require('fs');  // performs file i/o operations 
const bcrypt = require('bcrypt'); // encrypts the password
const AuthService = require('./auth_service');
const authService = new AuthService();

class UsersService {
  // local field that specifies path to the db
  _file_path =  './data/users.json';

  constructor() {
    this.users = [];

    fs.readFile(this._file_path, (err, data) => {
      err ? console.error("Couldn't load events data")
          : this.users = JSON.parse(data);
    });
  }

  async signup(username, password, isAdmin) {
    if (username.trim() === '' || password === '')
      return { success: false, errorMsg: 'Username and password cannot be empty'};
    if (this.users.some(user => user.username.toLowerCase() === username.toLowerCase()))
      return { success: false, errorMsg: `This username ${username.toLowerCase()} is already taken` };

    try {
      // hash the password and store the user in the db (json file)
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {username, password: hashedPassword, isAdmin}
      this.users.push(user);
      const dbSaveResult = await this._updateFile();
      if (!dbSaveResult.success)  // if there was an error saving new user
        return dbSaveResult;
      // if no erros, generate jwt token
      const token = authService.generateUserToken(user);
      return { success: true, token }
    } catch {
      return { success: false, errorMsg: 'Could not sign up, please try again later'};
    }
  }

  async login(username, password) {
    const user = this.users.find(user => user.username.toLowerCase() === username.toLowerCase());
    if (user == null) {
      return { success: false, errorMsg: 'Username not found' };
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        const token = authService.generateUserToken(user);
        return { success: true, token };
      }
      // if we get here, the password was incorrect
      return { success: false, errorMsg: 'Incorrect credentials' };
    } catch {
      return { success: false, errorMsg: 'Could not log in, please try again later'};
    }
  }

    // private asychronous method to write to a json file
  _updateFile() {
    return new Promise((resolve, reject) => {
      fs.writeFile(this._file_path, JSON.stringify(this.users), (err) => {
        err ? reject({success: false, errorMsg: 'Error occured saving your result'})
            : resolve({ success: true });
      });
    });
  }
}

module.exports = UsersService;
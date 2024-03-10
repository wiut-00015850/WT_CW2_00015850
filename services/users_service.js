// a service class that will perform CRUD operations on users.json
const fs = require('fs');  // performs file i/o operations 
const bcrypt = require('bcrypt'); // encrypts the password
const jwt = require('jsonwebtoken');  // needed to authorize users

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
      this.users.push({username, password: hashedPassword, isAdmin});
      return await this._updateFile();
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
      console.log(password, user.password);
      if (await bcrypt.compare(password, user.password))
        return { success: true };
      // if we get here, the password was incorrect
      return { success: false, errorMsg: 'Incorrect credentials' };
    } catch {
      return { success: false, errorMsg: 'Could not log in, please try again later'};
    }
  }

    // privae asychronous method to write to a json file
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
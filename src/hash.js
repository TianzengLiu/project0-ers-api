const bcrypt = require('bcrypt');

const saltRounds = 10;

let password_tony = '123'
bcrypt.hash(password_tony, saltRounds, function(err, hash) {
    if(!err) {
        //if no error
        console.log(hash)
    } else {
        console.log('Error: ', err)
    }
  });
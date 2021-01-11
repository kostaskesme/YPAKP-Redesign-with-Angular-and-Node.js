var User = require('../models/user');

exports.getAllUsers = function (req, res) {
    User.find((err, user) => {
      if (err) {
        res.status(400).send({ found: false, message: 'Could not get users' });
        console.log(err);
      }
      else
        res.status(200).json({ found: true, result: user });
    });
  }


exports.login = function (req, res) {
  User.findOne({afm :req.body.afm}, (err, user) => {
    if (!user) {
      res.status(200).send({ isLoggedIn: false, message: 'Could not find user' });
      console.log(err);
    }
    else
      if(req.body.password == user.password){
        res.status(200).json({ isLoggedIn: true, user });
      }
      else{
        res.status(200).send({ isLoggedIn: false, message: 'Incorrect Password' });
      }
  });
}

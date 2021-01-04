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
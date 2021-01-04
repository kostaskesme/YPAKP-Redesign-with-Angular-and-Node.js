var express = require('express');
var router = express.Router();
const User = require('../models/user');
var userController = require('../controllers/userController')



router.get('/users', function (req, res) {
    userController.getAllUsers(req, res);
  });

module.exports = router;

// exports.getAllUsers = function (req, res) {
//     User.find((err, user) => {
//       if (err) {
//         res.status(400).send({ found: false, message: 'Could not get users' });
//         console.log(err);
//       }
//       else
//         res.status(200).json({ found: true, result: user });
//     });
//   }
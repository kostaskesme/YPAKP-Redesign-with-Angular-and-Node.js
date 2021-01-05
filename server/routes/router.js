var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
var passport = require('passport');
const User = require('../models/user');



router.get('/users', function (req, res) {
    userController.getAllUsers(req, res);
  });

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err) {
      console.log('/login authenticate error', err);
      return next(err);
    }
    if (!user) {
      console.log('!user');
      return res.redirect('/login');
    }
    req.logIn(user, function (err) {
      if (err) {
        console.log('/login logIn error', err);
        return next(err);
      }
      return res.send({ isLoggedIn: true, user });
    });
  })(req, res, next);
});

router.post('/register', (request, response) => {
  User.register(new User(request.body), request.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return response.render('register');
    } else {
      passport.authenticate('local')(request, response, function () {
        response.send(true);
      });
    }
  });
});

module.exports = router;

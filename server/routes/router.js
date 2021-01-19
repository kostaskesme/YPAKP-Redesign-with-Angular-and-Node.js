var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
const User = require('../models/user');
 
router.get('/users', function (req, res) {
    userController.getAllUsers(req, res);
  });

router.post('/login', function (req, res, next) {
  userController.login(req, res);
});

router.get('/users/:id', function (req, res) {
  userController.getUsersById(req, res);
});

router.post('/changeSituations', function (req, res) {
  userController.changeSituations(req, res);
});

router.post('/apply', function (req, res) {
  userController.apply(req, res);
});

router.post('/unapply', function (req, res) {
  userController.apply(req, res);
});

module.exports = router;

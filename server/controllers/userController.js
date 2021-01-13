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
  User.findOne({firstName :req.body.firstName}, (err, user) => {
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

exports.getUsersById = function (req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(400).send({ found: false, message: `User with id:${req.params.id} not found!` });
      console.log(err);
    }
    else{
      if(user.type === "E"){
        User.find({'employer': req.params.id}, (err, employees) => {
          if(err){
            res.status(200).json({ found: true, User: user, array: [] });
          }
          else{
            res.status(200).json({ found: true, User: user, array: employees });
          }
        })
      }
      else{
        User.find({_id: user.employer}, (err, employer) => {
          if(err){
            res.status(200).json({ found: true, User: user});
          }
          else{
            res.status(200).json({ found: true, User: user, employer: employer });
          }
        })
      }
    }
  });
}

exports.changeSituations = function(req, res){
  req.body.forEach(element => {
    employee = User.findOneAndUpdate({_id: element[0]}, {situation: element[2], situationDate: element[1]}).then({});
  });
  res.status(200).json({ done: true});
}

exports.apply = function(req, res){
  User.findOneAndUpdate({_id: req.body.id}, {applied: true}, (err) =>{
    if(err){
      res.status(200).json({ done: false });
    }
    else{
      res.status(200).json({ done: true });
    }
  })
}
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
  fullName: String,
  dateOfBirth: String,
  address: String
});

var User = mongoose.model('User', userSchema);

/* GET users */
router.get('/', (req, res, next) => {
  User.find((err, users) => {
    res.json(users);
  })
});

// GET User with userId equals id
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err)
      res.send(err);
    res.json(user);
  });
});

// CREATE user
router.post('/create', (req, res, next) => {
  var user = new User(req.body);

  user.save((err, user) => {
    if (err) return console.error(err);
    console.log('added');
  });
  res.json(req.body);
});

// UPDATE user
router.put('/:id', (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id, req.body, (err, user) => {
      if (err) return console.error(err);
      console.log('updated');
      res.json(user);
    });
})

// DELETE user
router.delete('/:id', (req, res, next) => {
  User.deleteOne({
    _id: req.params.id
  }, err => {
    if (err)
      return res.send(err);
    res.status(200).send({status: 'record deleted'});
  });
  
})

module.exports = router;
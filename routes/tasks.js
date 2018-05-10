var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');



var taskSchema = mongoose.Schema({
  title: String,
  description: String,
  subtasks: [{
    title: String,
    status: String
  }],
  status: String
}, {
  strict: false
});

var Tasks = mongoose.model('Task', taskSchema);

/* GET tasks listing. */
router.get('/', (req, res, next) => {
  Tasks.find((err, tasks) => {
    res.json(tasks)
  });
});

/* CREATE task  */
router.get('/:id', (req, res, next) => {
  var task = new Tasks(req.body);

  task.save((err, task) => {
    if (err) return console.error(err);
    console.log('added task');
    res.json(task);
  });
})

module.exports = router;
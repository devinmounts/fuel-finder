const Message = require('../models/message');
const express = require('express');
const router = express.Router();

router.post('/new', (req, res) => {
  Message.create({
    message: req.body.message,
  }, (err, message) => {
    if (err) {
      console.log('CREATE Error: ' + err);
      res.status(500).send('Error');
    } else {
      res.status(200).json(message)
    }
  });
});

router.route('/:id')
  //** DELETE */
  .delete((req, res) => {
    Message.findById(req.params.id, (err, message) => {
      if (err) {
        console.log('DELETE ERROR: ' + err);
        res.status(500).send('Error');
      } else if (message) {
        task.remove( () => {
          res.status(200).json(message);
        });
      } else {
        res.status(404).send('Not found');
      }
    });
  });

  module.exports = router;
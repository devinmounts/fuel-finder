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

router.
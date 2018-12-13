const express = require('express');
const Joi = require('joi');

const db = require('../db');
const messages = db.get('messages');

const schema = Joi.object().keys({
  user_id: Joi.string(),
  station_id: Joi.number(),
  station_city: Joi.string(),
  name: Joi.string().min(1).max(500).required(),
  message: Joi.string().min(1).max(500).required(),
});
        
const router = express.Router();


router.get('/', (req, res) => {
  messages
    .find()
    .then(allMessages => {
      res.json(allMessages);
    });
});



router.post('/', (req, res, next) => {
  console.log('enter post');
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    const {name, message, user_id, station_id, station_city } = req.body;
    const userMessage = {
      user_id,
      station_id,
      station_city,
      name,
      message,
      date: new Date()
    };
    messages
      .insert(userMessage)
      .then(insertedMessage => {
        res.json(insertedMessage);
      });
  } else {
    next(result.error);
  }
});

module.exports = router;

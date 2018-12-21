const Message = require('../models/message');
const express = require('express');
const router = express.Router();


router.route('/stations/:stationId')
  .get((req, res) => {
    Message.find({station_id: req.params.stationId}, (err, stationMessages)=> {
      if (err) {
        console.log('GET ERROR: ' + err);
        res.status(500).send('Error');
      } else if (stationMessages) {
          res.status(200).json(stationMessages);
      } else {
        res.status(404).send('Not found');
      }
    })
  });

router.post('/new', (req, res) => {
  Message.create({
    user_id: req.body.user_id,
    station_id: req.body.station_id,
    station_city: req.body.station_city,
    name: req.body.name,
    message: req.body.message,
    date: Date.now(),
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
        console.log('DELETE Error: ' + err);
        res.status(500).send('Error');
      } else if (message) {
        message.remove( () => {
          res.status(200).json(message);
        });
      } else {
        res.status(404).send('Not found');
      }
    });
  })
  //** UDPATE */
  .put((req, res) => {
    console.log('received');
    const { newMessage, _id } = req.body;
    Message.findByIdAndUpdate( _id, {message: newMessage}, (err, message) => {
      if(err) {
        console.log('UPDATE Error: ' + err);
        res.status(500).send('Error');
      } else if (message) {
        res.status(200).json(message);
      } else {
        res.status(404).send('Not found');
      }
    })
  });

  module.exports = router;
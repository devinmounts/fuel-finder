const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const api = require('./routes/api');
const Pusher = require('pusher');

require('dotenv').config()

const pusher = new Pusher({
  appId: '676000',
  key: 'cfac003dbca7d9106af7',
  secret: '74aed2ff596027dac5f2',
  cluster: 'us2',
  encrypted: true
});

const channel = 'messages';

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);

// mongoose.connect('mongodb://localhost/fuel_finder?replicaSet=rs', { useNewUrlParser: true });
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Connection Error"));

db.once('open', () => {
  app.listen(9000, () => {
    console.log('Node server running on port 9000');
  });

  const messagesCollection = db.collection('messages');
  const changeStream = messagesCollection.watch();

  changeStream.on('change', (change) => {

    if(change.operationType === 'insert') {
      const message = change.fullDocument;
      pusher.trigger(
        channel,
        'inserted',
        {
          _id: message._id,
          message: message.message,
          user_id: message.user_id,
          station_id: message.station_id,
          station_city: message.station_city,
          date: message.date,
        }
      );
    } else if(change.operationType === 'delete') {
      pusher.trigger(
        channel,
        'deleted',
        change.documentKey._id
      );
    } else if (change.operationType === 'update') {
      const _id = change.documentKey._id;
      const message = change.updateDescription.updatedFields.message;
      pusher.trigger(
        channel,
        'updated',
        {
           _id,
          message: message,
        }
      )
    }
  });
});

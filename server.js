const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const morgan         = require('morgan');

const app            = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  app.listen(process.env.PORT || port, () => {
    console.log('Server running on ' + port);
  });
})

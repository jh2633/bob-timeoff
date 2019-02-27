const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
var request = require("request");

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());

app.get('/', (req, res) => {
  var options = { authorization: process.env.BOB_KEY,
    method: 'GET',
    url: 'https://api.hibob.com/v1/timeoff/outtoday' };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });

  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;

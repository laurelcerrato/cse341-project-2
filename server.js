const dns = require("dns");
dns.setServers(["8.8.8.8"]);
const express = require('express');
const bodyParse = require('body-parser');
const mongodb = require('./data/database.js');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParse.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X requested-with, Content-type, Access, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();

  
});
app.use('/', require('./routes'));


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node running on port ${port}`);
    });
  }
});
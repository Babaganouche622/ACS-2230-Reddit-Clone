/* Mongoose Connection */
/* Mongoose Connection */
const mongoose = require('mongoose');

const url = 'mongodb://localhost/reddit-db';

mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected successfully to database');
  })
  .catch((error) => {
    console.log('Failed to connect to database:', error);
  });

mongoose.connection.on('error', (error) => {
  console.log('MongoDB connection error:', error);
});
mongoose.set('debug', true);

module.exports = mongoose.connection;
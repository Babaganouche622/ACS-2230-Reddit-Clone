const express = require('express');
const exphbs = require('express-handlebars');

// Set up express app
const app = express();
app.use(express.static('public'));


// Set db
require('./data/reddit-db');

// Middleware
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set controllers
require('./controllers/posts')(app);

// Server
app.listen(3000);

module.exports = app;
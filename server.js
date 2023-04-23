const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const checkAuth = require('./middleware/checkAuth');

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
app.use(cookieParser());
app.use(checkAuth);

// Set controllers
require('./controllers/posts')(app);
require('./controllers/comments')(app);
require('./controllers/auth.js')(app);

// Server
app.listen(3000);

module.exports = app;
const express = require('express');
const eventsRoute = require('./routes/events_route');
const usersRoute = require('./routes/users_route');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// use pug as the template engine
app.set ('view engine', 'pug');

// parse cookies from the user's request
app.use(cookieParser());

// for urls that relate to events, use events.js to handle them
app.use('/events', eventsRoute);

app.use('/user', usersRoute);

// use static format (not dynamic) with public folder
app.use('/static', express.static('./public'));

// route for the home page
app.get('/', (req, res) => res.render('index'));

app.listen(port, () => console.log(`The app is listening at http://localhost:${port}`));
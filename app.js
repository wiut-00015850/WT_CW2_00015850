const express = require('express');
const eventsRoute = require('./routes/events_route');
const app = express();
const port = 3000;

// use pug as the template engine
app.set ('view engine', 'pug');

// for urls that relate to events, use events.js to handle them
app.use('/events', eventsRoute);

// use static format (not dynamic) with public folder
app.use('/static', express.static('./public'));

// route for the home page
app.get('/', (req, res) => res.render('index'));

app.listen(port, () => console.log(`The app is listening at http://localhost:${port}`));
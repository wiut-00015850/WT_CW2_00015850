const express = require('express');
const EventsController = require('./../controllers/events_controller');

const router = express.Router();
const eventsController = new EventsController();

router.use(express.urlencoded({ extended: false}));

router.get('/', eventsController.greet);

module.exports = router;
const express = require('express');
const EventsController = require('../controllers/events_controller');

const router = express.Router();
const eventsController = new EventsController();

router.use(express.json());

router.get('/', eventsController.showAll);

router.route('/new')
  .get((req, res, next) => 
    eventsController.showEditForm(req, res, next, true))
  .post(eventsController.create);

router.route('/:id')
  .get(eventsController.showEditForm)
  .put(eventsController.update)
  .delete(eventsController.delete);

module.exports = router;
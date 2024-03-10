const express = require('express');
const EventsController = require('../controllers/events_controller');
const AuthService = require('./../services/auth_service');

const router = express.Router();
const eventsController = new EventsController();
const authService = new AuthService();

router.use(express.json());

router.get('/', eventsController.showUpcoming);

router.route('/new')
  .get(authService.authenticateAdminToken, (req, res, next) => 
    eventsController.showEditForm(req, res, next, true))
  .post(authService.authenticateAdminToken, eventsController.create);  // only admins can create new events

router.get('/passed', eventsController.showPassed);

router.route('/:id')
  .get(eventsController.showEditForm)
  .put(authService.authenticateAdminToken, eventsController.update) // use middleware to authenticate admin's rights
  .delete(authService.authenticateAdminToken, eventsController.delete); // use middleware to authenticate admin's rights

module.exports = router;
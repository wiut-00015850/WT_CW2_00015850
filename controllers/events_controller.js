const EventsService = require('./../services/events_service');
const eventsService = new EventsService();

class EventsController {
  greet(req, res) {
    res.send(eventsService.sayHello());
  }
}

module.exports = EventsController;
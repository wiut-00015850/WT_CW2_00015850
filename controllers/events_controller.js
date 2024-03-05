const EventsService = require('./../services/events_service');
const eventsService = new EventsService();

class EventsController {

  showAll(req, res) {
    // res.send(eventsService.getAll());
    const events = eventsService.getAll();
    res.render('events', { events })
  }

  showById(req, res) {
    const { id } = req.params;
    if (!id)
      res.sendStatus(404);
    else {
      const event = eventsService.getById(id);
      event ? res.render('event', { event })
            : res.sendStatus(404);
    }
  }
}

module.exports = EventsController;
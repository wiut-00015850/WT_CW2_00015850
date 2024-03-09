const EventsService = require('./../services/events_service');
const eventsService = new EventsService();

class EventsController {

  // method to display a page with all events
  showAll(req, res) {
    const additionalInfo = Object.keys(req.query)[0];
    const events = eventsService.getAll();
    res.render('events', { events, additionalInfo });
  }

  // method to show info on the event
  showEditForm(req, res, next, forCreate = false) {
    if (forCreate) // if it is to create a form, no need to search for the event
      res.render('event', {event: {}, forCreate});
    else {
      const { id } = req.params;
      if (!id) // id is invalid or was not passed
        res.sendStatus(404);
      else {
        const event = eventsService.getById(id);
        event ? res.render('event', { event, forCreate })
        : res.sendStatus(404);
      }
    }
  }

  // update form and send result status
  async update(req, res) {
    const { id } = req.params;
    const result = await eventsService.update(id, req.body);
    if (result.success)
      res.sendStatus(204);
    else
      res.status(400).json({ errorMsg: result.errorMsg });
  }

  // delete the form and send result status
  async delete(req, res) {
    const { id } = req.params;
    const result = await eventsService.delete(id);
    if (result.success)
      res.sendStatus(204);
    else
      res.status(400).json({ errorMsg: result.errorMsg });
  }

  // create new form and show related status
  async create(req, res) {
    const result = await eventsService.create(req.body);
    if (result.success) {
      res.sendStatus(204);
    }
    else {
      res.status(400).json({ errorMsg: result.errorMsg });
    }
  }
}

module.exports = EventsController;
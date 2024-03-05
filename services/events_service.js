// a service class that will perform CRUD operations on events.json
const fs = require('fs');

class EventsService {

  sayHello() {
    return "saying hello from eventsService";
  }
}

module.exports = EventsService;
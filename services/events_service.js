// a service class that will perform CRUD operations on events.json
const fs = require('fs');

class EventsService {
  constructor() {
    this.events = [];

    fs.readFile('./data/events.json', (err, data) => {
      err ? console.error("Couldn't load events data")
          : this.events = JSON.parse(data);
    })
  }

  getAll() {
    return this.events;
  }

  getById(id) {
    return this.events.find((event) => event.id == id);
  }
}

module.exports = EventsService;
// a service class that will perform CRUD operations on events.json
const fs = require('fs');

class EventsService {
  // local field that specifies path to the db
  _file_path =  './data/events.json';
  _error_msg = '';

  constructor() {
    // array that represents events
    this.events = [];

    fs.readFile(this._file_path, (err, data) => {
      err ? console.error("Couldn't load events data")
          : this.events = JSON.parse(data);
    })
  }

  getUpcomingEvents() {
    return this.events.filter(event => new Date(event.date) > new Date())
           .sort(this._sortUpcomingEvents);
  }


  getPassedEvents() {
    return this.events.filter(event => new Date(event.date) < new Date())
           .sort(this._sortPassedEvents);
  }

  searchEvents(search) {
    // search the given string in title and description
    return this.events.filter(event => event.title.toLowerCase().includes(search) 
           || event.description.toLowerCase().includes(search));
  }

  getById(id) {
    return this.events.find((event) => event.id == id);
  }

  // validaties and then writes to the db
  async update(id, event) {
    const eventIndex = this._getEventIndex(id);
    if(eventIndex < 0 || !this._validateEvent(event))
      return { success: false, errorMsg: this._error_msg };
    this.events.splice(eventIndex, 1, {id, ...event});
    return await this._updateFile();
  }

  // validaties and then deletes from the db
  async delete(id) {
    const eventIndex = this._getEventIndex(id);
    if(eventIndex < 0)
      return { success: false, erroMsg: 'Wrong id, operation failed'};
    this.events.splice(eventIndex, 1);
    return await this._updateFile();
  }

  // validates and then inserts into the db
  async create(event) {
    if (!this._validateEvent(event))
      return { success: false, errorMsg: this._error_msg };
    const maxId = Math.max(...this.events.map(e => e.id));
    // if there no elems maxId will return -Infinity so need to set first item to 1
    this.events.push({id: maxId < 1 ? 1 : maxId + 1, ...event});
    return await this._updateFile();
  }

  // private method to get index of the event
  _getEventIndex(id) {
    return this.events.findIndex(event => event.id == id);
  }

  // private method to validate event 
  _validateEvent(event) {
    if (!event) {
      this._error_msg = 'Wrong input, please check your inputs';
      return false;
    }
    if (!event.title || event.title.trim() === '') {
      this._error_msg = 'Please provide title for the event';
      return false;
    }
    if (!event.venue || event.venue.trim() === '') {
      this._error_msg = 'Event venue cannot be empty, please provide value';
      return false;
    }
    if (!event.description || event.description.trim() === '') {
      this._error_msg = 'Users need description. Please provide description';
      return false;
    }
    if (!event.date || new Date(event.date) < new Date()) {
      this._error_msg = 'Event date needs to be set to a future date';
      return false;
    }
    return true;
  }

  // privae asychronous method to write to a json file
  _updateFile() {
    return new Promise((resolve, reject) => {
      fs.writeFile(this._file_path, JSON.stringify(this.events), (err) => {
        err ? reject({success: false, errorMsg: 'Error occured saving your error'})
            : resolve({ success: true });
      });
    });
  }

    // show events that come sooner first
  _sortUpcomingEvents(a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA < dateB)
      return -1;
    if (dateA > dateB)
      return 1;
    return 0;
  }

  // show recently passed events first
  _sortPassedEvents(a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA > dateB)
      return -1;
    if (dateA < dateB)
      return 1;
    return 0;
  }
}

module.exports = EventsService;
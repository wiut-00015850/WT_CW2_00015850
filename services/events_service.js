// a service class that will perform CRUD operations on events.json
const fs = require('fs');

class EventsService {
  // local field that specifies path to the db
  _file_path =  './data/events.json';

  constructor() {
    // array that represents events
    this.events = [];

    fs.readFile(this._file_path, (err, data) => {
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

  // validaties and then writes to the db
  async update(id, event) {
    const eventIndex = this._getEventIndex(id);
    if(eventIndex < 0 || !this._validateEvent(event))
      return false;
    this.events.splice(eventIndex, 1, {id, ...event});
    return await this._updateFile();
  }

  // validaties and then deletes from the db
  async delete(id) {
    const eventIndex = this._getEventIndex(id);
    if(eventIndex < 0)
      return false;
    this.events.splice(eventIndex, 1);
    return await this._updateFile();
  }

  // validates and then inserts into the db
  async create(event) {
    if (!this._validateEvent(event))
      return false;
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
    if (!event ||
        !event.title || event.title.trim() === '' ||
        !event.venue || event.venue.trim() === '')
      return false;
    return true;
  }

  // privae asychronous method to write to a json file
  _updateFile() {
    return new Promise((resolve, reject) => {
      fs.writeFile(this._file_path, JSON.stringify(this.events), (err) => {
        err ? reject(false) : resolve(true);
      });
    });
  }
}

module.exports = EventsService;
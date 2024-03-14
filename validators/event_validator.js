// a helper class that validates Event entity
class EventValidator {
  validateEvent(event) {
    if (!event) 
      return { success: false, errorMsg: 'Wrong input, please check your inputs' };

    if (!event.title || event.title.trim() === '')
      return { success: false, errorMsg: 'Please provide title for the event' };

    if (!event.venue || event.venue.trim() === '')
      return { success: false, errorMsg: 'Event venue cannot be empty, please provide value' };

    if (!event.description || event.description.trim() === '')
      return { success: false, errorMsg: 'Users need description. Please provide description' };

    if (!event.date || new Date(event.date) < new Date())
      return { success: false, errorMsg: 'Event date needs to be set to a future date' };

    // if we get here, that means the event is valid and we can safely save it
    return { success: true, errorMsg: '' };
  }
}

module.exports = EventValidator;
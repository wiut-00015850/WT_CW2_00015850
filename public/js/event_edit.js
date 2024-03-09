const id = document.getElementById('id').value;
const DEFAULT_SERVER_ERROR = "An error on the server occured, please try again later."

// delete event functionality
document.getElementById('deleteBtn')?.addEventListener('click', function() {
  fetch(`/events/${id}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (response.ok) {
      // if the operation was successful, redirect to all events page and show delete alert
      window.location.href = '/events?deleted';
    } else {
      console.error("something went wrong");
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

// update/create event functionality
document.getElementById('saveBtn').addEventListener('click', function() {
  const title = document.getElementById('title').value;
  const venue = document.getElementById('venue').value;
  const date = document.getElementById('date').value;
  const description = document.getElementById('description').value;
  const isCreateType = document.getElementById('forCreate').value;

  const eventData = {
    title,
    venue,
    date,
    description
  };

  // based on the edit type send POST or PUT request
  isCreateType ? sendCreateRequest(eventData) : sendUpdateRequest(eventData);
});

// sending a POST with eventData in its body
function sendCreateRequest(eventData) {
  fetch('/events/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  })
  .then(response => {
    if (response.ok) {
      // if the operation was successful, redirect to all events page and show created alert
      window.location.href = '/events?created';
    } else {
      // request failed, handle error
      response.json().then(error => {
        showErrorMessage(error.errorMsg);
      });
    }
  })
  .catch(error => {
    showErrorMessage(DEFAULT_SERVER_ERROR);
  });
}

// sending a PUT request with eventData in its body
function sendUpdateRequest(eventData) {
  fetch(`/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  })
  .then(response => {
    if (response.ok) {
      // if the operation was successful, redirect to all events page and show updated alert
      window.location.href = '/events?updated';
    } else {
      // request failed, handle error
      response.json().then(error => {
        showErrorMessage(error.errorMsg);
      });
    }
  })
  .catch(error => {
    showErrorMessage(DEFAULT_SERVER_ERROR);
  });
}

function showErrorMessage(message) {
  const mainElem = document.getElementById("main");
  const alertElem = document.createElement("div");
  alertElem.classList = "alert alert-danger";
  alertElem.setAttribute("role", "alert");
  alertElem.innerText = message;
  mainElem.insertBefore(alertElem, mainElem.firstChild);
  setTimeout(() => {
    mainElem.removeChild(alertElem);
  }, 4000);
}
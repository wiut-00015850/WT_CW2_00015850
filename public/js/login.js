const loginBtn = document.getElementById('btn-login');

loginBtn.addEventListener('click', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  console.log(username, password);

  fetch(`/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => {
    if (response.ok) {
      // if the operation was successful, store the token and go to home page
      console.log("token is here");
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
});

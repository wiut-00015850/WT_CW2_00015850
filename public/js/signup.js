const signupBtn = document.getElementById('btn-signup');
const signupForm = document.getElementById('signup-form');

signupBtn.addEventListener('click', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('passwordConfirm').value;
  const isAdmin = document.getElementById('isAdmin').checked;

  if (password === '') { 
    showErrorMessage("Password is a required field");
    return;
  }
  else if (password !== passwordConfirm) {
    showErrorMessage("Passwords do not match, please check your input.");
    return;
  }

  const signupData = {
    username,
    password,
    isAdmin
  }

  fetch(`/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(signupData)
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


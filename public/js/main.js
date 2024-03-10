// main js file that related to front-end development
const DEFAULT_SERVER_ERROR = "An error on the server occured, please try again later."

document.getElementById('btnSearch')?.addEventListener('click', function(event) {
  const searchValue = document.getElementById('inputSearch')?.value;
  if (!searchValue || searchValue.trim() === '') {
    // if the input is empty or only whitespaces, then prevent the form submission
    event.preventDefault();
  }
});

// general error message alert
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
// main js file that related to front-end development

document.getElementById('btnSearch')?.addEventListener('click', function(event) {
  const searchValue = document.getElementById('inputSearch')?.value;
  if (!searchValue || searchValue.trim() === '') {
    // if the input is empty or only whitespaces, then prevent the form submission
    event.preventDefault();
  }
});
const more = document.getElementById('more');
const rooms = document.querySelector('.rooms');

more.addEventListener('click', (e) => {
  e.preventDefault();
  fetch('/data')
    .then(resp => resp.text())
    .then(data => {
      rooms.innerHTML += data;
    });
});
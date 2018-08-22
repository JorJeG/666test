const more = document.getElementById('more');
const rooms = document.querySelector('.rooms');
const tab = document.querySelector('.nav__tab');
const aside = document.querySelector('.page__aside');

more.addEventListener('click', (e) => {
  e.preventDefault();
  fetch('/data')
    .then(resp => resp.text())
    .then(data => {
      rooms.innerHTML += data;
    });
});

tab.addEventListener('click', (e) => {
  e.preventDefault();
  aside.classList.toggle('page__aside_open');
  tab.classList.toggle('nav__tab_open');
});
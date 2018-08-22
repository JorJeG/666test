const more = document.getElementById('more'),
      rooms = document.querySelector('.rooms'),
      tab = document.querySelector('.nav__tab'),
      aside = document.querySelector('.page__aside'),
      main = document.querySelector('.main');

more.addEventListener('click', (e) => {
  /**
   * TODO: Здесь должен быть запрос на сервер с указанием 
   * сколько квартир пропустить с начала, пагинация
   */
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

main.addEventListener('click', (e) => {
  /**
   * TODO: Здесь должен быть пост запрос на сервер для
   * изменения состояния карточки
   */
  const target = e.target.classList.contains('card__favorite');
  if (target) {
    e.target.classList.toggle('card__favorite_selected');
  }
}, false);
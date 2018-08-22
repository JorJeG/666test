const more = document.getElementById('more'),
      rooms = document.querySelector('.rooms'),
      rooms__card = document.querySelectorAll('.rooms__card'),
      tab = document.querySelector('.nav__tab'),
      aside = document.querySelector('.page__aside'),
      main = document.querySelector('.main'),
      sortPriceBtn = document.querySelector('.main__sort_price'),
      sortRoomsBtn = document.querySelector('.main__sort_rooms');

let arrRooms = Array.prototype.slice.call(rooms__card);

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
      arrRooms = Array.prototype.slice.call(rooms.querySelectorAll('.rooms__card'));
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


/**
 * TODO: Порефакторить эти повторы
 */
sortPriceBtn.addEventListener('click', (e) => {
  const dataset = sortPriceBtn.dataset;
  const frag = document.createDocumentFragment();

  if (dataset.direction === 'ascend') {
    arrRooms.sort(function(a, b) {
      const price1 = parseInt(a.dataset.price.replace(/\s/g, ''));
      const price2 = parseInt(b.dataset.price.replace(/\s/g, ''));
      return price1 - price2;
    });
    dataset.direction = 'descend';
  } else {
    arrRooms.sort(function(a, b) {
      const price1 = parseInt(a.dataset.price.replace(/\s/g, ''));
      const price2 = parseInt(b.dataset.price.replace(/\s/g, ''));
      return price2 - price1;
    });
    dataset.direction = 'ascend';
  }
  arrRooms.forEach(room => frag.appendChild(room));
  rooms.innerHTML = '';
  rooms.appendChild(frag);
});

sortRoomsBtn.addEventListener('click', (e) => {
  const dataset = sortRoomsBtn.dataset;
  const frag = document.createDocumentFragment();

  if (dataset.direction === 'ascend') {
    arrRooms.sort(function(a, b) {
      const num1 = parseInt(a.dataset.rooms);
      const num2 = parseInt(b.dataset.rooms);
      return num1 - num2;
    });
    dataset.direction = 'descend';
  } else {
    arrRooms.sort(function(a, b) {
      const num1 = parseInt(a.dataset.rooms);
      const num2 = parseInt(b.dataset.rooms);
      return num2 - num1;
    });
    dataset.direction = 'ascend';
  }
  arrRooms.forEach(room => frag.appendChild(room));
  rooms.innerHTML = '';
  rooms.appendChild(frag);
});
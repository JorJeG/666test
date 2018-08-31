import {addBackToTop} from 'vanilla-back-to-top';
import LazyLoad from 'vanilla-lazyload';

document.addEventListener('DOMContentLoaded', function(){
  const more = document.getElementById('more'),
        rooms = document.querySelector('.rooms'),
        rooms__card = document.querySelectorAll('.rooms__card'),
        tab = document.querySelector('.nav__tab'),
        aside = document.querySelector('.page__aside'),
        main = document.querySelector('.main'),
        page = document.querySelector('.page'),
        overflow = document.querySelector('.overflow'),
        sortPriceBtn = document.querySelector('.main__sort_price'),
        sortRoomsBtn = document.querySelector('.main__sort_rooms');
  
  let arrRooms = Array.prototype.slice.call(rooms__card);
  const myLazy = new LazyLoad();

  loadRooms();
  
  more && more.addEventListener('click', (e) => {
    /**
     * TODO: Здесь должен быть запрос на сервер с указанием 
     * сколько квартир пропустить с начала, пагинация
     */
    e.preventDefault();
    loadRooms();
  });
  
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    aside.classList.toggle('page__aside_open');
    tab.classList.toggle('nav__tab_open');
    page.classList.toggle('page_hidden');
    overflow.classList.toggle('overflow_hidden');
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
  
  sortPriceBtn.addEventListener('click', () => {
    sortBy(sortPriceBtn, sortRoomsBtn, 'price');
  });
  
  sortRoomsBtn.addEventListener('click', () => {
    sortBy(sortRoomsBtn, sortPriceBtn, 'rooms');
  });
  
  addBackToTop({
    diameter: 56,
    backgroundColor: 'rgb(0, 0, 0)',
    textColor: '#fff',
    scrollDuration: 400
  });
  
  function sortBy(element, another, byData) {
    const dataset = element.dataset;
    const frag = document.createDocumentFragment();
    if(dataset.active !== 'active') {
      another.dataset.active = '';
      dataset.active = 'active';
    }
  
    if (dataset.direction === 'ascend') {
      arrRooms.sort(function(a, b) {
        const num1 = parseInt(a.dataset[byData]);
        const num2 = parseInt(b.dataset[byData]);
        return num1 - num2;
      });
      dataset.direction = 'descend';
    } else {
      arrRooms.sort(function(a, b) {
        const num1 = parseInt(a.dataset[byData]);
        const num2 = parseInt(b.dataset[byData]);
        return num2 - num1;
      });
      dataset.direction = 'ascend';
    }
    arrRooms.forEach(room => frag.appendChild(room));
    rooms.innerHTML = '';
    rooms.appendChild(frag);
  }

  function loadRooms() {
    fetch('/data')
      .then(resp => resp.text())
      .then(data => {
        rooms.innerHTML += data;
        arrRooms = Array.prototype.slice.call(rooms.querySelectorAll('.rooms__card'));
        myLazy.update();
      });
  }
  
});

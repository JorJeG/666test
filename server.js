const express = require('express');
const data = require('./data.json');

const app = express();
const PORT = process.env.PORT || '3001';

app.set('views', 'src/templates');
app.set('view engine', 'pug');

app.use(express.static('build'));

app.get('/', (request, response) => {
  response.render('index', {rooms: data});
});

app.get('/data', (request, response) => {
  response.render('rooms/rooms', {rooms: data});
});

app.listen(PORT, function() {
  console.log('Server started on localhost: ' + PORT);
});
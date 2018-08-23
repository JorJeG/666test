const express = require('express');
const compression = require('compression');
const data = require('./data.json');

const app = express();
const PORT = process.env.PORT || '3001';

app.set('views', 'src/templates');
app.set('view engine', 'pug');
app.use(compression());

app.use(express.static('build'));

app.get('/', (request, response) => {
  const overall = data.length*55;
  response.render('index', {overall});
});

app.get('/data', (request, response) => {
  response.render('rooms/rooms', {flats: data});
});

app.listen(PORT, function() {
  console.log('Server started on localhost: ' + PORT);
});
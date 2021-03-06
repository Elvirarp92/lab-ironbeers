const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:

app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res, next) => {
  punkAPI

    .getBeers()

    .then((beersFromApi) => {
      console.log(`Fetched beers: ${beersFromApi}`);
      res.render('beers', { beers: beersFromApi });
    })

    .catch((err) => {
      console.log(err);
    });
});

app.get('/random-beers', (req, res, next) => {
  punkAPI

    .getRandom()

    .then((randomBeer) => {
      console.log(`fetched random beer: ${randomBeer}`);
      res.render('extended', { beer: randomBeer });
    })

    .catch((err) => {
      console.log(err);
    });
});

app.get('/:id', (req, res, next) => {
  punkAPI
    .getBeer(req.params.id)
    .then((fetchedBeer) => {
      console.log(`fetched beer by ID: ${fetchedBeer}`);
      res.render('extended', { beer: fetchedBeer });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

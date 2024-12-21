let express = require('express');
let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

let app = express();
let PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

let db;
(async () => {
  db = await open({
    filename: './bd4/database.sqlite',
    driver: sqlite3.Database,
  });
})();

app.get('/', (req, res) => {
  res.send('working');
});

async function fetchAllMovies() {
  let query = 'SELECT * FROM movies';
  let results = await db.all(query, []);
  return { movies: results };
}

// /movies
app.get('/movies', async (req, res) => {
  try {
    let results = await fetchAllMovies();

    // no-data-present response
    if (results.movies.length === 0) {
      res.status(404).json({ message: 'No movies found.' });
    }

    // success response
    res.status(200).json(results);
  } catch (error) {
    // failure response
    res.status(500).json({ error: error.message });
  }
});

async function fetchMovies(attribute, value) {
  // let query = `SELECT * FROM movies where ${attribute}='${value}'`;
  // console.log(query);
  // let results = await db.all(query, []);
  // OR, use below approach
  let query = `SELECT * FROM movies where ${attribute}=?`;
  console.log(query);
  let results = await db.all(query, [value]);

  return { movies: results };
}

// /movies/genre/Action
app.get('/movies/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  let results = await fetchMovies('genre', genre);

  try {
    // no-data-present response
    // results === null for object or results === {} or resutls ==== undefined
    if (results.movies.length === 0) {
      return res.status(404).json({ message: 'No movies found for ' + genre });
    }
    return res.status(200).json(results);
  } catch (error) {
    // failure response
    res.status(500).json({ error: error.message });
  }
});

async function fetchAllMovies() {
  let query = 'SELECT * FROM movies';
  let results = await db.all(query, []);
  return { movies: results };
}

async function fetchMoviesLimited(columns_to_filter) {
  let query = `SELECT ${columns_to_filter} FROM movies`;
  let results = await db.all(query, []);
  return { movies: results };
}

async function getFilterColumns(columns) {
  let columns_list = columns.split(' ');
  let columns_to_filter = '';
  for (let i = 0; i < columns_list.length; i++) {
    if (i == columns_list.length - 1) {
      columns_to_filter += columns_list[i];
    } else {
      columns_to_filter += columns_list[i] + ',';
    }
  }
  console.log(columns_to_filter);
  return columns_to_filter;
}

// /movies-limited?columns=id%20title%20release_year
app.get('/movies-limited', async (req, res) => {
  try {
    let columns = req.query.columns;
    let columns_to_filter = await getFilterColumns(columns);
    let results = await fetchMoviesLimited(columns_to_filter);

    if (results.movies.length === 0) {
      return res.status(404).json({ message: 'No movies found' });
    }
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function fetchFilteredMoviesLimited(columns_to_filter, attribute, value) {
  let query = `SELECT ${columns_to_filter} FROM movies WHERE ${attribute}=?`;
  let results = await db.all(query, [value]);
  return { movies: results };
}

// /movies-limited/actor/Hrithik%20Roshan?columns=id%20actor%20title%20release_year
app.get('/movies-limited/actor/:actor', async (req, res) => {
  try {
    let columns = req.query.columns;
    let actor = req.params.actor;
    let columns_to_filter = await getFilterColumns(columns);
    let results = await fetchFilteredMoviesLimited(
      columns_to_filter,
      'actor',
      actor
    );

    if (results.movies.length === 0) {
      return res.status(404).json({ message: 'No movies found' });
    }
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function fetchMultiFilteredMovies(releaseYear, actor) {
  let query =
    'SELECT title, actor, release_year FROM movies WHERE release_year=? AND actor=?';
  let results = await db.all(query, [releaseYear, actor]);
  return { movies: results };
}

// /movies/year-actor?releaseYear=2019&actor=Salman%20Khan
app.get('/movies/year-actor/', async (req, res) => {
  try {
    let releaseYear = req.query.releaseYear;
    let actor = req.query.actor;
    let results = await fetchMultiFilteredMovies(releaseYear, actor);
    if (results.movies.length === 0) {
      return res.status(404).json({ message: 'No movies found' });
    }
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function fetchMoviesByRating(rating) {
  let query =
    'SELECT title,rating FROM movies WHERE rating>=? ORDER BY rating DESC';
  let results = await db.all(query, [rating]);
  return { movies: results };
}

// /movies/rating?rating=4.5
app.get('/movies/rating/', async (req, res) => {
  try {
    let rating = parseFloat(req.query.rating);
    let results = await fetchMoviesByRating(rating);

    if (results.movies.length === 0) {
      return res.status(404).json({ message: 'No movies found' });
    }
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server is listening at post ${PORT}`));

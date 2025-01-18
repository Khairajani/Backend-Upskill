const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

// ======================= Tutorial: BD1.1 =======================
// start node app: node index.js
// base GET code
app.get('/', (req, res) => {
  res.send(getHomeMessage());
});

// /shoutname?name=Himanshu
app.get('/shoutname', (req, res) => {
  let name = req.query.name;
  let nameUpperCase = name.toUpperCase();

  res.send(nameUpperCase);
});

// /shoutfullname?first=Himanshu&last=Khairajani
app.get('/shoutfullname', (req, res) => {
  let first = req.query.first;
  let last = req.query.last;
  let nameUpperCase = first + ' ' + last;

  res.send(nameUpperCase);
});

// /date?month=Sept&year=1999
app.get('/date', (req, res) => {
  let month = req.query.month;
  let year = req.query.year;
  let formattedDate = month + ', ' + year;

  res.send(formattedDate);
});

// /greet?name=Himanshu
app.get('/greet', (req, res) => {
  let name = req.query.name;
  let greetingMessage = 'Namaste, ' + name + '!';

  res.send(greetingMessage);
});

// /address?street=34+Samriddhi+Vihar&city=Raipur&state=CG
app.get('/address', (req, res) => {
  let street = req.query.street;
  let city = req.query.city;
  let state = req.query.state;
  let completeAddress = street + ', ' + city + ', ' + state;

  res.send(completeAddress);
});

// /email?username=himanshukhairajani8&domain=gmail.com
app.get('/email', (req, res) => {
  let username = req.query.username;
  let domain = req.query.domain;
  let email = username + '@' + domain;

  res.send(email);
});

// ======================= Tutorial: BD1.2 =======================
// /total-distance?distance1=100&distance2=08
app.get('/total-distance', (req, res) => {
  let distance1 = parseFloat(req.query.distance1);
  let distance2 = parseFloat(req.query.distance2);
  let totalDistance = distance1 + distance2;

  res.send(totalDistance.toString());
});

// /total-time?time1=100&time2=08&time3=08
app.get('/total-time', (req, res) => {
  let time1 = parseFloat(req.query.time1);
  let time2 = parseFloat(req.query.time2);
  let time3 = parseFloat(req.query.time3);
  let totalTime = time1 + time2 + time3;

  res.send(totalTime.toString());
});

// /total-speed?distance=100&time=08
app.get('/total-speed', (req, res) => {
  let distance = parseFloat(req.query.distance);
  let time = parseFloat(req.query.time);
  let totalSpeed = distance / time;

  res.send(totalSpeed.toString());
});

// /total-cal?duration1=100&duration2=100&calPerMin=2
app.get('/total-cal', (req, res) => {
  let duration1 = parseFloat(req.query.duration1);
  let duration2 = parseFloat(req.query.duration2);
  let calPerMin = parseFloat(req.query.calPerMin);
  let totalCal = (duration1 + duration2) * calPerMin;

  res.send(totalCal.toString());
});

// /interest?principal=1000&rate=5&time=2
app.get('/interest', (req, res) => {
  let principal = parseFloat(req.query.principal);
  let rate = parseFloat(req.query.rate);
  let time = parseFloat(req.query.time);
  let interest = (principal * time * rate) / 100;

  res.send(interest.toString());
});

// ======================= Tutorial: BD1.3 =======================
// /check-number?number=2
app.get('/check-number', (req, res) => {
  let number = parseFloat(req.query.number);
  let result;
  if (number > 0) {
    result = 'Positive';
  } else if (number == 0) {
    result = 'Zero';
  } else {
    result = 'Negative';
  }
  result = 'Number is ' + result;

  res.send(result);
});

// /check-odd-even?number=3
app.get('/check-odd-even', (req, res) => {
  let number = parseFloat(req.query.number);
  let result;
  if (number % 2 == 0) {
    result = 'Even';
  } else {
    result = 'Odd';
  }
  result = 'Number is ' + result;

  res.send(result);
});

// /check-login?isLoggedIn=true
app.get('/check-login', (req, res) => {
  let is_user_logged_in = req.query.isLoggedIn == 'true';
  let result;
  if (is_user_logged_in) {
    result = 'User is logged in';
  } else {
    result = 'User is not logged in';
  }

  res.send(result);
});

// ======================= Tutorial: BD1.4 =======================
// function for home page (round implemented in beginning)
function getHomeMessage() {
  return 'This is Home Page.';
}

function checkPassword(password) {
  if (password.length < 15) {
    return 'Weak password';
  } else {
    return 'Strong password';
  }
}

// /check-password?password=himanshu
app.get('/check-password', (req, res) => {
  res.send(checkPassword(req.query.password));
});

// ======================= Tutorial: BD2.1 =======================
function getPersonDetails() {
  let somevar = {
    FirstName: 'Himanshu',
    LastName: 'Khairajani',
    Age: 25,
    'Is Married': false,
    'Is Member': true,
    Branch: 'CSE',
    Year: 2017,
  };
  return somevar;
}

// /person
app.get('/person', (req, res) => {
  res.json(getPersonDetails());
  res.json(getPersonDetails().FirstName);
  res.json(getPersonDetails()['Is Married']);
});

function getShippingCost(cartTotal) {
  let personDetails = getPersonDetails();
  let isMember = personDetails['Is Member'];
  let shippingCost;
  if (isMember && cartTotal >= 500) {
    shippingCost = 0;
  } else {
    shippingCost = 99;
  }
  // toFixed() add decimal points + it also converts to string.
  return shippingCost.toFixed(2);
}
// /shipping-cost?cartTotal=1000
app.get('/shipping-cost', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  console.log(req.query);
  res.json({ 'Shipping Cost': getShippingCost(cartTotal) });
});

// ======================= Tutorial: BD2.2 =======================
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function filterEven(num) {
  return num % 2 == 0;
}

function getEvenNumbers() {
  // Using filters
  let evenNumbers = numbers.filter((num) => filterEven(num));
  return evenNumbers;
}

// /even-numbers
app.get('/even-numbers', (req, res) => {
  res.json({ 'Even Numbers': getEvenNumbers() });
});

let words = ['himanshu', 'is', 'a', 'good', 'software', 'engineer', 'period'];

function filterLength(word, length = 5) {
  return word.length > length;
}

function getLongWords() {
  // Using filters
  let longWords = words.filter((word) => filterLength(word));
  return longWords;
}

// /long-words
app.get('/long-words', (req, res) => {
  res.json({ 'Long Words': getLongWords() });
});

// ======================= Tutorial: BD2.2/3 =======================
let objects = [
  {
    FirstName: 'Himanshu',
    LastName: 'Khairajani',
    Age: 25,
    'Is Married': false,
    'Is Member': true,
    Branch: 'SDE2',
    Year: 1999,
  },
  {
    FirstName: 'Hitesh',
    LastName: 'Khairajani',
    Age: 25,
    'Is Married': false,
    'Is Member': false,
    Branch: 'MBBS',
    Year: 1999,
  },
  {
    FirstName: 'Rohit',
    LastName: 'Panjwani',
    Age: 20,
    'Is Married': false,
    'Is Member': false,
    Branch: 'Business',
    Year: 2005,
  },
  {
    FirstName: 'Mohit',
    LastName: 'Badwal',
    Age: 28,
    'Is Married': true,
    'Is Member': true,
    Branch: 'SDE3',
    Year: 1996,
  },
];

function getObjectWithBranch(object, branch) {
  return object.Branch.toLowerCase() == branch.toLowerCase();
}

// /object/branch/:
app.get('/object/branch/:branch', (req, res) => {
  let branch = req.params.branch;
  let personWithCategory = objects.filter((object) =>
    getObjectWithBranch(object, branch)
  );
  res.json({ 'Object with branch': personWithCategory });
});

// ======================= Tutorial: BD2.4 =======================
numbers = [1, 234, 65, -1, 0, 2];

function sortNumbers(number1, number2) {
  // Ascending
  // return number1 - number2;
  // Descending
  // return number2 - number1
}
// /sort-numbers
app.get('/sort-numbers', (req, res) => {
  let numbersCopy = numbers.slice();
  numbersCopy.sort(sortNumbers);
  res.json({ 'Sorted Numbers': numbersCopy });
});

// ======================= Tutorial: BD3.1 =======================
numbers = [1, 2, 4, 5, -1];

function addToArr(arr, element) {
  arr.push(element);
  return arr;
}

// /numbers/add/5
app.get('/numbers/add/:element', (req, res) => {
  let element = parseFloat(req.params.element);
  res.json(addToArr(numbers.slice(), element));
});

function sumOfArr(arr) {
  let sumValue = 0;
  for (let i = 0; i < arr.length; i++) {
    sumValue = sumValue + arr[i];
  }
  return sumValue;
}

// /numbers/sum
app.get('/numbers/sum/', (req, res) => {
  res.json(sumOfArr(numbers.slice()));
});

// ======================= Tutorial: BD3.2 =======================

function findElementInArr(item, element) {
  return item == element;
}

// /numbers/find/:element
app.get('/numbers/find/:element', (req, res) => {
  let element = req.params.element;
  let value = numbers.find((number) => findElementInArr(number, element));
  res.json({ value: value });
});

// ======================= Tutorial: BD3.3 =======================

function deleteElementInArr(item, element) {
  return item != element;
}

// /numbers/delete/:element
app.get('/numbers/delete/:element', (req, res) => {
  let element = req.params.element;
  let numbersUpdated = numbers.filter((number) =>
    deleteElementInArr(number, element)
  );
  res.json({ numbersUpdated: numbersUpdated });
});

// ======================= Tutorial: BD4 =======================
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

let db;
(async () => {
  db = await open({
    filename: './bd4/database.sqlite',
    driver: sqlite3.Database,
  });
})();

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

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

function getHomeMessage() {
  return 'This is Home Page of FoodieFinds.';
}

// Home-Page
app.get('/', (req, res) => {
  res.send(getHomeMessage());
});

async function fetchDBData(dbname, attribute, value, sort_columns, sort_types) {
  console.log(dbname);
  console.log(`${attribute}:${value}`);
  let query = '';
  let query_substring = '';
  let filter = [];
  if (attribute !== undefined && attribute !== null) {
    for (let i = 0; i < attribute.length; i++) {
      if (i == 0) {
        query_substring += ' where ';
      }
      if (i == attribute.length - 1) {
        query_substring += `${attribute[i]}=?`;
      } else {
        query_substring += `${attribute[i]}=? AND `;
      }
      filter.push(value[i]);
    }
  }
  if (sort_columns !== undefined && sort_columns !== null) {
    for (let i = 0; i < sort_columns.length; i++) {
      if (i === 0) {
        query_substring += ' ORDER BY';
      }
      query_substring += ` ${sort_columns[i]} ${sort_types[i]}`;
      if (i !== sort_columns.length - 1) {
        query_substring += ',';
      }
    }
  }
  query = `SELECT * FROM ${dbname}` + query_substring;
  console.log('\nquery:', query, '\nfilter:', filter);
  let results = await db.all(query, filter);
  return { [`${dbname}`]: results };
}

// /restaurants
app.get('/restaurants', async (req, res) => {
  try {
    let results = await fetchDBData('restaurants');

    // no-data-present response
    if (results.restaurants.length === 0) {
      res.status(404).json({ message: 'No restaurants found.' });
    }
    // success response
    res.status(200).json(results);
  } catch (error) {
    // failure response
    res.status(500).json({ error: error.message });
  }
});

// /restaurants/sort-by-rating
app.get('/restaurants/sort-by-rating', async (req, res) => {
  try {
    let results = await fetchDBData(
      'restaurants',
      [],
      [],
      ['rating'],
      ['DESC']
    );

    // no-data-present response
    if (results.restaurants.length === 0) {
      res.status(404).json({ message: 'No restaurants found.' });
    }
    // success response
    res.status(200).json(results);
  } catch (error) {
    // failure response
    res.status(500).json({ error: error.message });
  }
});

// /restaurants/details/1
app.get('/restaurants/details/:id', async (req, res) => {
  let id = req.params.id;
  let results = await fetchDBData('restaurants', ['id'], [id]);

  try {
    // no-data-present response
    // results === null for object or results === {} or resutls ==== undefined
    if (results.restaurants.length === 0) {
      return res
        .status(404)
        .json({ message: 'No restaurants found for ID ' + id });
    }
    return res.status(200).json(results);
  } catch (error) {
    // failure response
    res.status(500).json({ error: error.message });
  }
});

// /restaurants/cuisine/Indian
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  let cuisine = req.params.cuisine;
  let results = await fetchDBData('restaurants', ['cuisine'], [cuisine]);

  try {
    // no-data-present response
    // results === null for object or results === {} or resutls ==== undefined
    if (results.restaurants.length === 0) {
      return res
        .status(404)
        .json({ message: 'No restaurants found for cuisine ' + cuisine });
    }
    return res.status(200).json(results);
  } catch (error) {
    // failure response
    res.status(500).json({ error: error.message });
  }
});

// /restaurants/filter?isVeg=true&hasOutdoorSeating=true&isLuxury=false
app.get('/restaurants/filter', async (req, res) => {
  let isVeg = req.query.isVeg;
  let hasOutdoorSeating = req.query.hasOutdoorSeating;
  let isLuxury = req.query.isLuxury;
  let results = await fetchDBData(
    'restaurants',
    ['isVeg', 'hasOutdoorSeating', 'isLuxury'],
    [isVeg, hasOutdoorSeating, isLuxury]
  );

  try {
    // no-data-present response
    // results === null for object or results === {} or resutls ==== undefined
    if (results.restaurants.length === 0) {
      return res
        .status(404)
        .json({ message: 'No restaurants found for provided filters' });
    }
    return res.status(200).json(results);
  } catch (error) {
    // failure response
    res.status(500).json({ error: error.message });
  }
});

// /dishes
app.get('/dishes', async (req, res) => {
  try {
    let results = await fetchDBData('dishes');

    // no-data-present response
    if (results.dishes.length === 0) {
      res.status(404).json({ message: 'No dishes found.' });
    }
    // success response
    res.status(200).json(results);
  } catch (error) {
    // failure response
    res.status(500).json({ error: error.message });
  }
});

// /dishes/sort-by-price
app.get('/dishes/sort-by-price', async (req, res) => {
  try {
    let results = await fetchDBData('dishes', [], [], ['price'], ['ASC']);

    // no-data-present response
    if (results.dishes.length === 0) {
      res.status(404).json({ message: 'No dishes found.' });
    }
    // success response
    res.status(200).json(results);
  } catch (error) {
    // failure response
    res.status(500).json({ error: error.message });
  }
});

// /dishes/details/1
app.get('/dishes/details/:id', async (req, res) => {
  let id = req.params.id;
  let results = await fetchDBData('dishes', ['id'], [id]);

  try {
    // no-data-present response
    // results === null for object or results === {} or resutls ==== undefined
    if (results.dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes found for ID ' + id });
    }
    return res.status(200).json(results);
  } catch (error) {
    // failure response
    res.status(500).json({ error: error.message });
  }
});

// /dishes/filter?isVeg=true
app.get('/dishes/filter', async (req, res) => {
  let isVeg = req.query.isVeg;
  let results = await fetchDBData('dishes', ['isVeg'], [isVeg]);

  try {
    // no-data-present response
    // results === null for object or results === {} or resutls ==== undefined
    if (results.dishes.length === 0) {
      return res
        .status(404)
        .json({ message: 'No dishes found for provided filters' });
    }
    return res.status(200).json(results);
  } catch (error) {
    // failure response
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server is listening at post ${PORT}`));

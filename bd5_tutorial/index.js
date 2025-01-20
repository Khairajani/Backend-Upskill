// const express = require('express');
// const { resolve } = require('path');
import express from 'express';
import { resolve } from 'path';
import { track } from './models/track.model.js';
import { sequelize } from './lib/index.js';
import { tracks } from './constants/track.data.js';

const app = express();
const port = 3000;

// ======================= Tutorial: BD1.1 =======================
// start node app: node index.js
// base GET code
// function for home page (round implemented in beginning)
function getHomeMessage() {
  return 'This is Home Page oF BD5 tutorial';
}

app.get('/', (req, res) => {
  res.send(getHomeMessage());
});

app.get('/seed_db', async (req, res) => {
  try {
    // sync ==> helps in sync the defined models to the database by creating the tables if the do not exists.
    // force:true ==> drop existing tables and create new ones to match the current schema provided
    // Not recomended in PROD evironment
    await sequelize.sync({ force: true });

    await track.bulkCreate(tracks);

    res.status(201).json({ message: 'Database seeding successful' });
  } catch (error) {
    res.status(500).json({ message: 'Seeding failed', error: error.message });
  }
});

async function findTracks(flag, attribute, value, sort_attribute, sort_type) {
  // findOne is for particular ID
  // findAll is for all the objects OR filtering on particular field value
  console.log(flag, attribute, value, sort_attribute, sort_type);
  var result = {};
  if (flag === 'one') {
    let trackData = await track.findOne({ where: { [attribute]: value } }); // returns a single object
    console.log(trackData);
    result = { track: trackData };
  } else {
    if (attribute === undefined) {
      if (sort_attribute === undefined) {
        let tracks = await track.findAll(); // returns a list of objects
        result = { tracks }; // converting it to dict of {tracks:<list of objects>}
      } else {
        console.log(sort_attribute, sort_type);
        let tracks = await track.findAll({
          order: [[sort_attribute, sort_type]],
        }); // returns a list of objects
        console.log(tracks);
        result = { tracks }; // converting it to dict of {tracks:<list of objects>}
      }
    } else {
      console.log({ attribute, value });
      let tracks = await track.findAll({ where: { [attribute]: value } });
      result = { tracks }; // converting it to dict of {tracks:<list of objects>}
    }
  }
  console.log(result);
  return result;
}

app.get('/tracks', async (req, res) => {
  try {
    let result = await findTracks();

    if (result.tracks.length === 0) {
      return res.status(400).json({ message: 'Tracks Empty' });
    }
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching tracks', error: error.message });
  }
});

// /tracks/artist/Arijit%20Singh
app.get('/tracks/artist/:artist', async (req, res) => {
  try {
    let artist = req.params.artist;
    let result = await findTracks(undefined, 'artist', artist);

    if (result.tracks.length === 0) {
      return res.status(400).json({ message: 'Tracks Empty' });
    }
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching tracks', error: error.message });
  }
});

// /tracks/details/2
app.get('/tracks/details/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await findTracks('one', 'id', id);

    if (result.track === null) {
      return res.status(400).json({ message: 'Not track found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching tracks', error: error.message });
  }
});

// /tracks/sort?by=release_year&type=desc
app.get('/tracks/sort/', async (req, res) => {
  try {
    let sort_attribute = req.query.by;
    let sort_type = req.query.type;
    let result = await findTracks(
      undefined,
      undefined,
      undefined,
      sort_attribute,
      sort_type
    );

    if (result.tracks.length === 0) {
      return res.status(400).json({ message: 'Tracks Empty' });
    }
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching tracks', error: error.message });
  }
});

async function addTrack(newTrack) {
  console.log(`New track being added: ${newTrack}`);
  let trackData = await track.create(newTrack);
  return { trackData };
}
// /track/new
app.post('/track/new', async (req, res) => {
  try {
    let newTrack = req.body.newTrack;
    response = await addTrack(newTrack);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching tracks', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

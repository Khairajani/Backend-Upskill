// const express = require('express');
// const { resolve } = require('path');
import express from "express";
import { resolve } from "path";
import { track } from "./models/track.model.js";
import { sequelize } from "./lib/index.js";
import { tracks } from "./constants/track.data.js";
import { users } from "./constants/user.data.js";
import { user } from "./models/user.model.js";
import { like } from "./models/like.model.js";
import { Op } from "@sequelize/core";

const app = express();
app.use(express.json());
const port = 3000;

// ======================= Tutorial: BD5 =======================
// start node app: node index.js
// base GET code
// function for home page (round implemented in beginning)
function getHomeMessage() {
  return "This is Home Page oF BD5 tutorial";
}

app.get("/", (req, res) => {
  res.send(getHomeMessage());
});

app.get("/seed_db", async (req, res) => {
  try {
    // sync ==> helps in sync the defined models to the database by creating the tables if the do not exists.
    // force:true ==> drop existing tables and create new ones to match the current schema provided
    // Not recomended in PROD evironment
    await sequelize.sync({ force: true });

    // adding tracks to track model
    await track.bulkCreate(tracks);

    // adding users to user model
    await user.bulkCreate(users);

    res.status(201).json({ message: "Database seeding successful" });
  } catch (error) {
    res.status(500).json({ message: "Seeding failed", error: error.message });
  }
});

async function findTracks(flag, attribute, value, sort_attribute, sort_type) {
  // findOne is for particular ID
  // findAll is for all the objects OR filtering on particular field value
  console.log(flag, attribute, value, sort_attribute, sort_type);
  var result = {};
  if (flag === "one") {
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

app.get("/tracks", async (req, res) => {
  try {
    let result = await findTracks();

    if (result.tracks.length === 0) {
      return res.status(400).json({ message: "Tracks Empty" });
    }
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tracks", error: error.message });
  }
});

// /tracks/artist/Arijit%20Singh
app.get("/tracks/artist/:artist", async (req, res) => {
  try {
    let artist = req.params.artist;
    let result = await findTracks(undefined, "artist", artist);

    if (result.tracks.length === 0) {
      return res.status(400).json({ message: "Tracks Empty" });
    }
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tracks", error: error.message });
  }
});

// /tracks/details/2
app.get("/tracks/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await findTracks("one", "id", id);

    if (result.track === null) {
      return res.status(400).json({ message: "Not track found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tracks", error: error.message });
  }
});

// /tracks/sort?by=release_year&type=desc
app.get("/tracks/sort/", async (req, res) => {
  try {
    let sort_attribute = req.query.by;
    let sort_type = req.query.type;
    let result = await findTracks(
      undefined,
      undefined,
      undefined,
      sort_attribute,
      sort_type,
    );

    if (result.tracks.length === 0) {
      return res.status(400).json({ message: "Tracks Empty" });
    }
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tracks", error: error.message });
  }
});

async function addTrack(newTrack) {
  console.log(`New track being added: ${newTrack}`);
  let trackData = await track.create(newTrack);
  return { trackData };
}
// /track/new
app.post("/tracks/new", async (req, res) => {
  try {
    let newTrack = req.body.newTrack;
    let response = await addTrack(newTrack);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding tracks", error: error.message });
  }
});

async function updateExistingTrack(id, updateTrack) {
  let trackDetails = await track.findOne({ where: { id: id } });
  if (!trackDetails) {
    return null;
  }
  trackDetails.set(updateTrack);
  let updatedTrack = await trackDetails.save();
  console.log(updatedTrack);
  return { updatedTrack };
}

// /tracks/update/2
app.post("/tracks/update/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let updateTrack = req.body.updateTrack;
    let response = await updateExistingTrack(id, updateTrack);
    if (response === null) {
      return res.status(404).json({ message: "No track found" });
    }
    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding tracks", error: error.message });
  }
});

// tracks/delete/2
app.post("/tracks/delete/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let trackDetails = await track.findOne({ where: { id: id } });
    if (!trackDetails) {
      return res.status(404).json({ message: "No track found" });
    }
    let deletedTrack = await trackDetails.destroy();
    return res.status(200).json({ deletedTrack });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting tracks", error: error.message });
  }
});

async function addUser(newUser) {
  console.log(`New user being added: ${newUser}`);
  let userData = await user.create(newUser);
  return { userData };
}
// /users/new
app.post("/users/new", async (req, res) => {
  try {
    let newUser = req.body.newUser;
    let response = await addUser(newUser);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding user", error: error.message });
  }
});

async function updateExistingUser(id, updateUser) {
  console.log(`User being updated: ${updateUser}`);
  let userDetails = await user.findOne({ where: { id: id } });
  if (!userDetails) {
    return null;
  }
  userDetails.set(updateUser);
  let updatedUser = await userDetails.save();
  return { updatedUser };
}

// /users/update/2
app.post("/users/update/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let updateUser = req.body.updateUser;
    let response = await updateExistingUser(id, updateUser);
    if (response === null) {
      return res.status(404).json({ message: "No user found" });
    }
    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding user", error: error.message });
  }
});

async function likeTrack(data) {
  let likeData = await like.create({
    userId: data.userId,
    trackId: data.trackId,
  });
  return { likeData };
}
// /users/4/like
app.post("/users/:id/like", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let trackId = parseInt(req.query.id);
    let response = await likeTrack({ userId, trackId });
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error liking tracks", error: error.message });
  }
});

async function dislikeTrack(data) {
  let dislikeData = await like.destroy({
    where: {
      userId: data.userId,
      trackId: data.trackId,
    },
  });
  return { dislikeData };
}
// /users/4/dislike
app.post("/users/:id/dislike", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let trackId = parseInt(req.query.id);
    let response = await dislikeTrack({ userId, trackId });
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error disliking tracks", error: error.message });
  }
});

async function fetchLikedTracks(userId, artist) {
  let tracks = await like.findAll({
    where: {
      userId: userId,
    },
    attributes: ["trackId"],
  });

  let trackIds = tracks.map((track) => track.trackId);
  let LikedTracks = [];
  if (artist != undefined) {
    LikedTracks = await track.findAll({
      where: { id: { [Op.in]: trackIds }, artist },
      attributes: ["id", "name", "artist", "release_year"],
    });
  } else {
    LikedTracks = await track.findAll({
      where: { id: { [Op.in]: trackIds } },
      attributes: ["id", "name", "artist", "release_year"],
    });
  }
  return { tracks: LikedTracks };
}
// /users/4/liked
app.post("/users/:id/liked", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let response = await fetchLikedTracks(userId);
    if (response.tracks.length === 0) {
      return res.status(404).json({ message: "No liked tracks found" });
    }
    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error disliking tracks", error: error.message });
  }
});

// /users/4/liked
app.post("/users/:id/liked-artists", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let artist = req.query.artist;
    let response = await fetchLikedTracks(userId, artist);
    if (response.tracks.length === 0) {
      return res.status(404).json({ message: "No liked tracks found" });
    }
    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error disliking tracks", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

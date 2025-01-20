import { DataTypes, sequelize } from '../lib/index.js';

let track = sequelize.define('track', {
  name: DataTypes.TEXT,
  genre: DataTypes.TEXT,
  release_year: DataTypes.INTEGER,
  artist: DataTypes.STRING,
  album: DataTypes.STRING,
  duration: DataTypes.INTEGER,
});

export { track };

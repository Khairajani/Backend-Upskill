import { DataTypes, Sequelize } from "sequelize";

let sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

export { DataTypes, sequelize };

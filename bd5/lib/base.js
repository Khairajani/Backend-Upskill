import { DataTypes, Sequelize } from "sequelize";

let sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./databse.sqlite",
});

export { DataTypes, sequelize };

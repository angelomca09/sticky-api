import Sequelize from "sequelize";
import db from "../db/postgres.db.js";

const User = db.define(
  "users",
  {
    userId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userPassword: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userEmail: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    userTelephone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { underscored: true }
);

export default User;

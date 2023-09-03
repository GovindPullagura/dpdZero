const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize-config");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isPositiveInteger(value) {
          if (!Number.isInteger(value) || value <= 0) {
            throw new Error("Invalid age.");
          }
        },
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["male", "female", "non-binary"]],
          msg: "Invalid gender.",
        },
      },
    },
  },
  {
    indexes: [], // Disable index retrieval
  }
);

module.exports = User;

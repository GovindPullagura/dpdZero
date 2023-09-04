const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize-config");

const Data = sequelize.define("Data", {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Data;

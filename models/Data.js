const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize-config");

const Data = sequelize.define("Data", {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Data;

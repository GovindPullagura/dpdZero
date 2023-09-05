const Data = require("../models/Data");
const jwt = require("jsonwebtoken");

const DataController = {
  storeData: async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, "dpdzero");
      const { key, value } = req.body;

      const requiredFields = ["key", "value"];
      const missingFields = requiredFields.filter((field) => !req.body[field]);

      if (missingFields.length > 0) {
        return res.status(400).send({
          status: "error",
          code: "MISSING_FIELDS",
          message: `Missing fields. Please provide both key and value.`,
        });
      }

      if (typeof key !== "string") {
        return res.status(400).send({
          status: "error",
          code: "INVALID_KEY",
          message: `The provided key is not valid or missing.`,
        });
      }
      if (typeof value !== "number") {
        return res.status(400).send({
          status: "error",
          code: "INVALID_VALUE",
          message: `The provided value is not valid or missing.`,
        });
      }

      const retrievedData = await Data.findOne({
        where: { key, username: decoded.username },
      });
      if (retrievedData) {
        return res.status(400).send({
          status: "error",
          code: "KEY_EXISTS",
          message:
            "The provided key already exists in the database. To update an existing key, use the update API.",
        });
      }
      // Create a new record in the "Data" table
      const newData = await Data.create({
        username: decoded.username,
        key,
        value,
      });

      // Send a success response with the saved data
      res.status(201).send({
        status: "success",
        message: "Data stored successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error occurred. Please try again later.",
      });
    }
  },

  retrieveData: async (req, res) => {
    try {
      const { key } = req.params;

      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, "dpdzero");

      const retrievedData = await Data.findOne({
        where: { key, username: decoded.username },
      });
      if (retrievedData) {
        res.send({
          status: "success",
          data: { key: retrievedData.key, value: retrievedData.value },
        });
      } else {
        res.status(400).send({
          status: "error",
          code: "KEY_NOT_FOUND",
          message: "The provided key does not exist in the database.",
        });
      }
    } catch (error) {
      console.log(error);

      res.status(500).send({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error occurred. Please try again later.",
      });
    }
  },

  updateData: async (req, res) => {
    try {
      const { key } = req.params;

      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "dpdzero");

      const retrievedData = await Data.findOne({
        where: { key, username: decoded.username },
      });
      if (retrievedData) {
        retrievedData.value = req.body.value;
        await retrievedData.save();

        res.status(200).send({
          status: "success",
          message: "Data updated successfully.",
        });
      } else {
        res.status(400).send({
          status: "error",
          code: "KEY_NOT_FOUND",
          message: "The provided key does not exist in the database.",
        });
      }
    } catch (error) {
      console.log(error);

      res.status(500).send({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error occurred. Please try again later.",
      });
    }
  },

  deleteData: async (req, res) => {
    try {
      const { key } = req.params;

      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "dpdzero");

      const retrievedData = await Data.findOne({
        where: { key, username: decoded.username },
      });
      if (retrievedData) {
        await retrievedData.destroy();

        res.send({
          status: "success",
          message: "Data deleted successfully.",
        });
      } else {
        res.status(400).send({
          status: "error",
          code: "KEY_NOT_FOUND",
          message: "The provided key does not exist in the database.",
        });
      }
    } catch (error) {
      console.log(error);

      res.status(500).send({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  },
};

module.exports = DataController;

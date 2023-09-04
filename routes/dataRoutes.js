const express = require("express");
const dataRouter = express.Router();
const DataController = require("../controllers/dataController");

// API Routes
dataRouter.post("/", DataController.storeData);

module.exports = dataRouter;

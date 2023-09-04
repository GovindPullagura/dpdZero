const express = require("express");
const dataRouter = express.Router();
const DataController = require("../controllers/dataController");

// API Routes
dataRouter.post("/", DataController.storeData);
dataRouter.get("/:key", DataController.retrieveData);
dataRouter.put("/:key", DataController.updateData);
dataRouter.delete("/:key", DataController.deleteData);

module.exports = dataRouter;

const express = require("express");
require("dotenv").config();
const sequelize = require("./sequelize-config");
const userRouter = require("./routes/userRoutes");
const dataRouter = require("./routes/dataRoutes");
const port = process.env.PORT || 3000;
const { auth } = require("./middlewares/AuthToken");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to DPDZero!");
});

app.use("/users", userRouter);
// app.use(auth);
app.use("/data", dataRouter);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

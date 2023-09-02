const express = require("express");
require("dotenv").config();
const sequelize = require("./sequelize-config");
const userRouter = require("./routes/userRoutes");
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to DPDZero!");
});

app.use("/users", userRouter);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

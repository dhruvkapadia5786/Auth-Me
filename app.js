const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = 5000;

const authRoutes = require("./routes/users");

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "Auth",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Successfully.");
  })
  .catch((err) => {
    console.error("Oops ! Unable to Connect Mongoose Server Error", err);
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  return res.send({
    error: false,
    message: "Server is Running Healthy",
  });
});

app.use("/users", authRoutes);

app.listen(PORT, () => {
  console.log("Server Started Listening on PORT : " + PORT);
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

// Routers
const users = require("./routers/users/router");

// Middleware
const middleware = require("./middleware");


mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", middleware);

app.use("/users", users);

app.get("/health", (req, res) => res.send("ok"));

app.listen(port, () => {});

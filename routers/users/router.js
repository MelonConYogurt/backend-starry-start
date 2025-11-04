const express = require("express");
const userRouter = express.Router();
const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema({
  avatar: String,
  name: String,
  age: Number,
  email: String,
  gender: String,
  username: String,
});

const User = mongoose.model("user", userSchema, "users");

// Rutas
userRouter.get("/", async (req, res) => {
  try {
    console.log(req.params.limit);
    console.log(req.params.skip);

    const users = await User.find().limit(10).skip(0);
    res.json(users);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error fetching users");
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const { avatar, name, age, email, gender, username } = req.body;
    const user = new User({
      avatar,
      name,
      age: age,
      email,
      gender,
      username,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(`${Error}`);
  }
});

module.exports = userRouter;

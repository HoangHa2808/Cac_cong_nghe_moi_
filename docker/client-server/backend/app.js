const fs = require("fs");
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const User = require("./models/user");

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users: users.map((user) => ({
        id: user.id,
        email: user.email,
        password: user.password,
        money: user.money,
      })),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to load users." });
  }
});

app.post("/users", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const money = 100000;
  console.log(money);
  if (!email || email.trim().length === 0) {
    return res.status(422).json({ message: "Invalid email." });
  }

  if (!password || password.trim().length === 0) {
    return res.status(422).json({ message: "Invalid password." });
  }

  const user = new User({
    email: email,
    password: password,
    money: money,
  });
  console.log(user);
  try {
    await user.save();
    res.status(201).json({
      message: "User saved",
      user: {
        id: user.id,
        email: email,
        money: money,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to save user." });
  }
});

app.delete("/users/:email", async (req, res) => {
  try {
    await User.deleteOne({ email: req.params.email });
    res.status(200).json({ message: "Deleted user!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to delete user." });
  }
});

mongoose.connect(
  // `mongodb://localhost:27017/users`,
  'mongodb://host.docker.internal:27017/users',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error("FAILED TO CONNECT TO MONGODB");
      console.error(err);
    } else {
      console.log("CONNECTED TO MONGODB!!");
      app.listen(80);
    }
  }
);

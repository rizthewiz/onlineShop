const express = require("express");
const db = require("../database");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "funny lemon Ops";

const router = express.Router();

// Admin Route
router.get("/", async (req, res, next) => {
  try {
    const users = await db.getUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await db.getSingleUser(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const user = await db.insertUser(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
      req.body.address
    );
    console.log(req.body);
    console.log(user);
    // need to send token
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    // find user by email compare password from req with stored bcrypt pwassword
    // generate token if matches.
    // send response and token
    const user = await db.getUserByEmail(req.body.email);
    console.log(user);
    if (!user) {
      console.log("anything");
      throw new Error("User email does not exist");
    }
    const isMatchingPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isMatchingPassword) {
      throw new Error("Invalid User Credentials");
    }

    const token = await jwt.sign({ id: user.id }, SECRET);
    console.log(user);
    res.send({ token: token, name: user.firstname });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

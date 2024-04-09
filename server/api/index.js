const express = require("express");
const db = require("../database");

const userRouter = require("./users.router");
const productRouter = require("./products.router");
// const cartRouter = require("./cart.router");

const router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
// router.use("/users/:id/cart", cartRouter);

// Admin Route WARNING WILL DELETE ALL PRODUCTS IN CATEGORY
router.delete("/categories/:id", async (req, res, next) => {
  console.log("req", req.params.id);
  try {
    const categories = await db.removeCategory(req.params.id);
    console.log(res);
    res.sendStatus(204);
    console.log(`Sucessfully Removed Category`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Admin Route
router.post("/categories", async (req, res, next) => {
  try {
    const category = await db.insertCategory(req.body.name);
    res.send(category);
  } catch (error) {
    next(error);
  }
});

router.get("/categories", async (req, res, next) => {
  try {
    const categories = await db.getCategories();
    res.send(categories);
  } catch (error) {
    next(error);
  }
});

// Admin Route
router.put("/categories/:id", async (req, res, next) => {
  try {
    const category = await db.updateCategory(req.body.name, req.params.id);
    res.send(category);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

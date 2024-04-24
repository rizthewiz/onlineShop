const express = require("express");
const db = require("../database");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await db.getProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await db.getSingleProduct(req.params.id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// Admin Route
router.delete("/:id", async (req, res, next) => {
  try {
    const products = await db.removeProduct(req.params.id);
    res.sendStatus(204);
    console.log(`Sucessfully Removed Product`);
  } catch (error) {
    next(error);
  }
});
// Admin Route
router.post("/", async (req, res, next) => {
  try {
    const product = await db.insertProduct(
      req.body.title,
      req.body.price,
      req.body.quantity,
      req.body.image,
      req.body.category_name
    );

    res.send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Admin Route
router.put("/products/:id", async (req, res, next) => {
  try {
    const product = await db.updateProduct(
      req.body.title,
      req.body.price,
      req.body.quantity,
      req.body.image,
      req.body.category_name,
      req.params.id
    );

    res.send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// get products by category id

module.exports = router;

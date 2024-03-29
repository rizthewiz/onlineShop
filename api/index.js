const express = require("express");
const db = require("../database");

const router = express.Router();

//  add router functionality here example router.get("users")

// Admin Route
router.get("/users", async (req, res, next) => {
  try {
    const users = await db.getUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.get("/users/:id", async (req, res, next) => {
  try {
    const user = await db.getSingleUser(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.get("/products", async (req, res, next) => {
  try {
    const products = await db.getProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// test below
router.get("/products/:id", async (req, res, next) => {
  try {
    const product = await db.getSingleProduct(req.params.id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.post("/users", async (req, res, next) => {
  try {
    const user = await db.insertUser(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
      req.body.address
    );
    console.log(user);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// Admin Route
router.post("/products/", async (req, res, next) => {
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
router.delete("/products/:id", async (req, res, next) => {
  try {
    const products = await db.removeProduct(req.params.id);
    res.sendStatus(204);
    console.log(`Sucessfully Removed Product`);
  } catch (error) {
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

module.exports = router;

const express = require("express");
const db = require("../database");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "funny lemon Ops";

const router = express.Router();

// Add items to cart
router.post("/:id/cart", async (req, res, next) => {
  // get cartid by userid
  try {
    const cart = await db.getCartByUserId(req.params.id);
    const { product_id, quantity } = req.body;
    //get title, price, image from products table where the product id is equal to product_id
    //use product information to create and insert a new cart item
    //return created cart item in response
    const productInfo = await db.getSingleProduct(product_id);
    console.log(productInfo);
    const cartItem = await db.insertCartItem(
      cart.id,
      product_id,
      productInfo.title,
      productInfo.price,
      productInfo.image,
      quantity
    );
    res.send(cartItem);
  } catch (error) {
    next(error);
  }
});

// Update items in cart
router.put("/:id/cart", async (req, res, next) => {
  // get cartid by userid
  try {
    const cart = await db.getCartByUserId(req.params.id);
    const { product_id, quantity } = req.body;
    const cartItem = await db.updateCart(product_id, quantity);
    res.send(cartItem);
  } catch (error) {
    next(error);
  }
});

// Remove from cart
router.delete("/:id/cart/:product_id", async (req, res, next) => {
  try {
    const cart = await db.getCartByUserId(req.params.id);
    console.log("cart", cart);
    console.log(req.params.product_id);
    const item = await db.removeItem(req.params.product_id);
    console.log(res);
    res.sendStatus(204);
    console.log(`Sucessfully Removed Item`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/carts", async (req, res, next) => {
  try {
    const carts = await db.getAllCarts();
    res.send(carts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/cart", async (req, res, next) => {
  try {
    const cart = await db.getCartByUserId(req.params.id);
    console.log("cart", cart);
    // get all items in cart with cart id
    const items = await db.getItemsByCartId(cart.id);
    res.send(items);
  } catch (error) {
    next(error);
  }
});

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
    await db.addUserCart(user.id);
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
    if (!user) {
      throw new Error("User email does not exist");
    }
    const isMatchingPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isMatchingPassword) {
      throw new Error("Invalid User Credentials");
    }

    const token = jwt.sign({ id: user.id }, SECRET);
    res.send({ token: token, name: user.firstname, id: user.id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

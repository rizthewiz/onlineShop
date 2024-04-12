const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/store_db"
);

const bcrypt = require("bcrypt");

// This is going to grow large how to name and seperate files
// Admin, Seller, User files or User, Product files
// Also need to test logic

const getUsers = async () => {
  const SQL = `
    SELECT * FROM users;
    `;

  const response = await client.query(SQL);
  return response.rows;
};

const getSingleUser = async (id) => {
  const SQL = `
    SELECT * FROM users WHERE id = $1;
    `;

  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

const getProducts = async () => {
  const SQL = `
    SELECT * FROM products;
    `;

  const response = await client.query(SQL);
  return response.rows;
};

const insertUser = async (firstName, lastName, email, password, address) => {
  const SQL = `
      INSERT INTO users(firstName, lastName, email, password, address) VALUES($1, $2, $3, $4, $5)
      RETURNING firstName, lastName, email, address, id`;

  const response = await client.query(SQL, [
    firstName,
    lastName,
    email,
    await bcrypt.hash(password, 5),
    address,
  ]);
  return response.rows[0];
};

const addUserCart = async (id) => {
  const SQL = `
  INSERT INTO carts(user_id) VALUES($1)
  RETURNING *`;

  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

const getUserByEmail = async (email) => {
  const SQL = `
  SELECT * FROM users
  WHERE email = $1;
  `;

  const response = await client.query(SQL, [email]);
  return response.rows[0];
};

const insertProduct = async (title, price, quantity, image, category_name) => {
  const SQL = `
      INSERT INTO products(title, price, quantity, image, category_id) VALUES($1, $2, $3, $4,(SELECT category_id FROM categories WHERE name = $5))
      RETURNING *`;
  console.log("run");
  const response = await client.query(SQL, [
    title,
    price,
    quantity,
    image,
    category_name,
  ]);
  console.log(response);
  return response.rows[0];
};

const insertCategory = async (name) => {
  const SQL = `
  INSERT INTO categories(name) VALUES($1)
  RETURNING *`;

  const response = await client.query(SQL, [name]);
  return response.rows[0];
};

const getCategories = async () => {
  const SQL = `
    SELECT * FROM categories;
    `;

  const response = await client.query(SQL);
  return response.rows;
};

const removeCategory = async (id) => {
  console.log(id);
  const SQL = `
        DELETE FROM categories
        WHERE category_id = $1`;

  const response = await client.query(SQL, [id]);
  return true;
};

const removeProduct = async (id) => {
  const SQL = `
        DELETE FROM products
        WHERE id = $1`;

  const response = await client.query(SQL, [id]);
  return true;
};

const getSingleProduct = async (id) => {
  const SQL = `
    SELECT * FROM products WHERE id = $1;
    `;

  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

const updateCategory = async (name, category_id) => {
  const SQL = `UPDATE categories
  SET name=$1
  WHERE category_id=$2
  RETURNING *`;

  const response = await client.query(SQL, [name, category_id]);
  return response.rows[0];
};

const updateProduct = async (
  title,
  price,
  quantity,
  image,
  category_name,
  id
) => {
  const SQL = `UPDATE products
  SET title=$1, price=$2, quantity=$3, image=$4, category_id=(SELECT category_id FROM categories WHERE name = $5) 
  WHERE id=$6
  RETURNING *`;

  const response = await client.query(SQL, [
    title,
    price,
    quantity,
    image,
    category_name,
    id,
  ]);
  return response.rows[0];
};

const getCartByUserId = async (id) => {
  console.log(id);
  const SQL = `
  SELECT id FROM carts
  WHERE user_id = $1;`;

  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

const getAllCarts = async () => {
  const SQL = `
  SELECT * FROM carts;`;

  const response = await client.query(SQL);
  return response.rows;
};

const getItemsByCartId = async (id) => {
  const SQL = `
  SELECT * FROM cartItems 
  WHERE cart_id = $1;`;

  const response = await client.query(SQL, [id]);
  return response.rows;
};

const insertCartItem = async (
  cart_id,
  product_id,
  title,
  price,
  image,
  quantity
) => {
  const SQL = `
  INSERT INTO cartItems(cart_id, product_id, product_title, product_price, product_image, quantity) VALUES($1, $2, $3, $4, $5, $6)
  RETURNING*`;

  const response = await client.query(SQL, [
    cart_id,
    product_id,
    title,
    price,
    image,
    quantity,
  ]);
  console.log(response.rows);
  return response.rows[0];
};

module.exports = {
  client,
  getCategories,
  getUsers,
  getProducts,
  getUserByEmail,
  insertUser,
  insertCategory,
  insertProduct,
  getSingleUser,
  getSingleProduct,
  removeCategory,
  removeProduct,
  updateCategory,
  updateProduct,
  getCartByUserId,
  insertCartItem,
  addUserCart,
  getAllCarts,
  getItemsByCartId,
};

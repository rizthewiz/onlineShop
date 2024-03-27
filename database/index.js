const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/store_db"
);

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
      RETURNING *`;

  const response = await client.query(SQL, [
    firstName,
    lastName,
    email,
    password,
    address,
  ]);
  console.log(response);
  return response.rows[0];
};

const insertProduct = async (title, price, quantity, image, category_name) => {
  const SQL = `
      INSERT INTO products(title, price, quantity, image, category_id) VALUES($1, $2, $3, $4,(SELECT category_id FROM categories WHERE name = $5))
      RETURNING *`;

  const response = await client.query(SQL, [
    title,
    price,
    quantity,
    image,
    category_name,
  ]);
  return response.rows[0];
};

module.exports = { client, getUsers, getProducts, insertUser, insertProduct };

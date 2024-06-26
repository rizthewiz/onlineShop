const { client } = require(".");
const bcrypt = require("bcrypt");

const categories = [
  { name: "His Pleasure" },
  { name: "Her Pleasure" },
  { name: "Couples" },
  { name: "Lubricants" },
  { name: "Games" },
];

const dummyUsers = [
  {
    firstName: "Jason",
    lastName: "Smith",
    email: "ennis.holland@comcast.net",
    password: "password",
    address: "9057 W. Linda St. Norwood, MA 02062",
  },
  {
    firstName: "Amanda",
    lastName: "Smith",
    email: "o0dk13rkcm1@yahoo.com",
    password: "password",
    address: "9057 W. Linda St. Norwood, MA 02062",
  },
  {
    firstName: "Craig",
    lastName: "Fowler",
    email: "creag.fowler@aol.com",
    password: "password",
    address: "9251 James St. Jonesborough, TN 37659",
  },
  {
    firstName: "Benji",
    lastName: "Banks",
    email: "benji.banks@ymail.com",
    password: "password",
    address: "12 Paris Hill Ave. Tewksbury, MA 01876",
  },
  {
    firstName: "Kacy",
    lastName: "Kern",
    email: "k1ab570m3cf0@comcast.net",
    password: "password",
    address: "27 William Drive Depew, NY 14043",
  },
];

const dummyProducts = [
  {
    title: "bullet",
    price: 40,
    quantity: 30,
    image:
      "https://cdn3.vectorstock.com/i/1000x1000/90/92/add-image-icon-editable-outline-vector-30399092.jpg",
    category_id: 2,
  },
  {
    title: "cock ring",
    price: 40,
    quantity: 30,
    image:
      "https://cdn3.vectorstock.com/i/1000x1000/90/92/add-image-icon-editable-outline-vector-30399092.jpg",

    category_id: 1,
  },
  {
    title: "strap-on",
    price: 40,
    quantity: 30,
    image:
      "https://cdn3.vectorstock.com/i/1000x1000/90/92/add-image-icon-editable-outline-vector-30399092.jpg",

    category_id: 3,
  },
  {
    title: "Truth or Dare",
    price: 40,
    quantity: 30,
    image:
      "https://cdn3.vectorstock.com/i/1000x1000/90/92/add-image-icon-editable-outline-vector-30399092.jpg",
    category_id: 5,
  },
];

const deleteTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS cartItems;
    DROP TABLE IF EXISTS carts;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS users;
    `;
  await client.query(SQL);
};

const createTables = async () => {
  const SQL = `
  CREATE TABLE users(
    id serial PRIMARY KEY,
    firstName VARCHAR(40) NOT NULL,
    lastName VARCHAR(40) NOT NULL,
    email VARCHAR(120) NOT NULL,
    password VARCHAR(250) NOT NULL,
    address VARCHAR(80) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    isSeller BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
  );

        CREATE TABLE categories(
          category_id serial PRIMARY KEY,
          name VARCHAR(30) NOT NULL
        );

        CREATE TABLE products(
            id serial PRIMARY KEY,
            title VARCHAR(40) NOT NULL,
            price INTEGER NOT NULL,
            description VARCHAR(255),
            quantity INTEGER NOT NULL,
            image VARCHAR(255),
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP DEFAULT now(),
            category_id INTEGER REFERENCES categories(category_id) ON DELETE CASCADE
          );   `;

  await client.query(SQL);
};

const createCartTables = async () => {
  const SQL = `CREATE TABLE carts(
    id serial PRIMARY KEY,
    user_id INTEGER REFERENCES users(id)
    );

CREATE TABLE cartItems(
id serial PRIMARY KEY,
cart_id INT REFERENCES carts(id),
product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
product_title VARCHAR(40) NOT NULL,
product_price INTEGER NOT NULL,
product_image VARCHAR(255),
quantity INTEGER NOT NULL DEFAULT(1)
); `;

  await client.query(SQL);
};

const seedCart = async () => {
  const SQL = `
  INSERT INTO carts(user_id) VALUES(1);
  INSERT INTO carts(user_id) VALUES(2);
  INSERT INTO carts(user_id) VALUES(3);
  INSERT INTO carts(user_id) VALUES(4);
  INSERT INTO carts(user_id) VALUES(5);`;

  await client.query(SQL);
};

const seedUsers = async () => {
  const queryParams = dummyUsers
    .map(
      (user, i) =>
        `($${i * 5 + 1}, $${i * 5 + 2}, $${i * 5 + 3}, $${i * 5 + 4}, $${
          i * 5 + 5
        })`
    )
    .join(",");

  const storedUser = dummyUsers.flatMap(async (user) => [
    user.firstName,
    user.lastName,
    user.email,
    await bcrypt.hash(user.password, 5),
    user.address,
  ]);

  const values = (await Promise.all(storedUser)).flat();
  const SQL = `
          INSERT INTO users(firstName, lastName, email, password, address) VALUES${queryParams};
        `;
  await client.query(SQL, values);
};

const seedCategories = async () => {
  const queryParams = categories
    .map((category, i) => `($${i * 1 + 1})`)
    .join(",");

  const values = categories.flatMap((category) => [category.name]);

  const SQL = `
      INSERT INTO categories(name) VALUES${queryParams} `;

  await client.query(SQL, values);
};

const seedProducts = async () => {
  const queryParams = dummyProducts
    .map(
      (product, i) =>
        `($${i * 5 + 1}, $${i * 5 + 2}, $${i * 5 + 3}, $${i * 5 + 4}, $${
          i * 5 + 5
        })`
    )
    .join(",");

  const values = dummyProducts.flatMap((product) => [
    product.title,
    product.price,
    product.quantity,
    product.image,
    product.category_id,
  ]);

  const SQL = `
          INSERT INTO products(title, price, quantity, image, category_id) VALUES${queryParams};
        `;
  await client.query(SQL, values);
};

module.exports = async () => {
  await deleteTables();
  console.log(`deleted tables`);
  await createTables();
  console.log(`created tables`);
  await createCartTables();
  console.log("cart tables created");
  await seedUsers();
  console.log(`seeded users`);
  await seedCategories();
  console.log(`seeded categories`);
  await seedProducts();
  console.log(`seeded products`);
  await seedCart();
  console.log("cart seeded");
};

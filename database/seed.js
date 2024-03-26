const { client } = require(".");

const categories = [
  { name: "His Pleasure", category_id: 1 },
  { name: "Her Pleasure", category_id: 2 },
  { name: "Couples", category_id: 3 },
  { name: "Lubricants", category_id: 4 },
  { name: "Games", category_id: 5 },
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
    image: "https://foolish-scene.net",
    category_id: 2,
  },
  {
    title: "cock ring",
    price: 40,
    quantity: 30,
    image: "https://foolish-scene.net",
    category_id: 1,
  },
  {
    title: "strap-on",
    price: 40,
    quantity: 30,
    image: "https://foolish-scene.net",
    category_id: 3,
  },
  {
    title: "Truth or Dare",
    price: 40,
    quantity: 30,
    image: "https://foolish-scene.net",
    category_id: 5,
  },
];

const deleteTables = async () => {
  const SQL = `
      DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS users;
    `;
  await client.query(SQL);
};

const createTables = async () => {
  //   cart [] added to user? if yes then cart table needs to be created after everything else referencing user and product tables
  const SQL = `
  CREATE TABLE users(
    id serial PRIMARY KEY,
    firstName VARCHAR(40) NOT NULL,
    lastName VARCHAR(40) NOT NULL,
    email VARCHAR(80) NOT NULL,
    password VARCHAR(40) NOT NULL,
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
            category_id INTEGER REFERENCES categories(category_id) NOT NULL
          );
      `;

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

  const values = dummyUsers.flatMap((user) => [
    user.firstName,
    user.lastName,
    user.email,
    user.password,
    user.address,
  ]);

  const SQL = `
          INSERT INTO users(firstName, lastName, email, password, address) VALUES${queryParams};
        `;
  await client.query(SQL, values);
};

const seedCategories = async () => {
  const queryParams = categories
    .map((category, i) => `($${i * 2 + 1}, $${i * 2 + 2})`)
    .join(",");

  const values = categories.flatMap((category) => [
    category.name,
    category.category_id,
  ]);

  const SQL = `
      INSERT INTO categories(name, category_id) VALUES${queryParams}`;

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
  await seedUsers();
  console.log(`seeded users`);
  await seedCategories();
  console.log(`seeded categories`);
  await seedProducts();
  console.log(`seeded products`);
};

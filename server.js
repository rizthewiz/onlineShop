const express = require("express");
const { client } = require("./database");
const seed = require("./database/seed.js");
const api = require("./api");
const port = 3000;

const app = express();
app.use(requires("morgan"), "dev");
app.use(express.json());
app.use("/api", api);
app.use((err, req, res, next) => {
  res.status(500).send({ error: "Something is wrong" });
});

const init = async () => {
  await client.connect();
  console.log("connected to db");

  await seed();

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

init();

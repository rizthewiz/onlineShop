const express = require("express");
const { client } = require("../database/index.js");
const seed = require("../database/seed.js");
const api = require("./api.js");
const port = 3000;

const app = express();
app.use(require("morgan")("dev"));
app.use(express.json());
app.use("/api", api);
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err.message });
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

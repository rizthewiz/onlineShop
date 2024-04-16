const path = require("path");
const express = require("express");
const { client } = require("../server/database/index.js");
const seed = require("../server/database/seed.js");
const api = require("./api/index.js");
const port = process.env.PORT || 3000;

const app = express();
app.use(require("morgan")("dev"));
app.use(express.json());
app.use("/api", api);
app.use(express.static(path.join(__dirname, "../client/pleasures/dist")));
app.use(
  "/",
  express.static(path.join(__dirname, "../client/pleasures/dist/index.html"))
);
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err.message });
});

const init = async () => {
  await client.connect();
  console.log("connected to db");

  // await seed();

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

init();

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const router = require("./routes/fact_routes");

if (process.env.NODE_ENV !== "prod") {
  require("dotenv").config();
}

const port = process.env.PORT || 8000;
const config = {
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || "27017",
  DB_NAME: process.env.DB_NAME || "factsdb",
};
const dbURL = `mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;
const mclient = new MongoClient(dbURL, { useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(router);

mclient
  .connect()
  .then((dbConn) => {
    app.config = config;
    app.db = dbConn.db(config.DB_NAME);
    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    });
  })
  .catch((dbErr) => {
    console.error(dbErr);
    process.exit(-1);
  });

module.exports = app;

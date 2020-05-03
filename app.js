const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const router = require("./routes/fact_routes");

if (fs.existsSync("./.env")) {
  require("dotenv").config();
}

const PORT = process.env.PORT || 8000;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || "27017";
const DB_NAME = process.env.DB_NAME || "factsdb";
const dbURL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const mclient = new MongoClient(dbURL, {
  useUnifiedTopology: true,
});

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
    app.db = dbConn.db(DB_NAME);
    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV || "DEV"} mode on ${PORT}`
      );
    });
  })
  .catch((dbErr) => {
    console.error(dbErr);
    process.exit(-1);
  });

module.exports = app;

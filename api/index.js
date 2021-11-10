require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth");
const entriesRoute = require("./routes/entries");


//connect to db
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGOOSE IS SUCCESSFULLY CONNECTED!");
  })
  .catch((err) => {
    console.log(err);
  });

//middlewares
//we should use them before routes
const whitelist = [
  "http://localhost:5000",
  "http://localhost:3000",
  "http://localhost:4000",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use(express.json());

//routes
app.use("/api/auth", authRoute);
app.use("/api/entries", entriesRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`BACKEND SERVER IS RUNNING ON ${PORT}`);
});

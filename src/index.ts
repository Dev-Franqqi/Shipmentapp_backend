const express = require("express");
const userRoute = require("./routes/signup");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use("/user", userRoute);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log("database successfully connected");
    app.listen(process.env.PORT, () => {
        console.log("listening on port "+process.env.PORT)
    })
    })
    .catch((error:unknown) => {
        console.log(error)
    })
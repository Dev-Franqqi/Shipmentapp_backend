"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.express = void 0;
exports.express = require("express");
const userRoute = require("./routes/user");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productRoute = require("./routes/shipment");
const cors = require("cors");
require("dotenv").config();
const app = (0, exports.express)();
app.use(cors());
app.use(bodyParser.json());
app.use("/user", userRoute);
app.use('/admin', productRoute);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log("database successfully connected");
    app.listen(process.env.PORT, () => {
        console.log("listening on port " + process.env.PORT);
    });
})
    .catch((error) => {
    console.log(error);
});

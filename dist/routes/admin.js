"use strict";
const express = require("express");
const router = express.Router();
router.get("/shipment/create", (req, res) => {
    res.status(200).json({ "message": "create route accessed" });
});
router.update("/shipment/update", (req, res) => {
    res.status(200).json({ "message": "update route accessed" });
});
router.delete("/shipment/delete", (req, res) => {
    res.status(200).json({ "message": "delete route accessed" });
});
router.get("/users", (req, res) => {
    res.status(200).json({ "message": "All users" });
});
router.delete("/users/delete", (req, res) => {
    res.status(200).json({ "message": , "deleted a user":  });
});

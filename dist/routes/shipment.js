"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { getShipment, createShipment } = require("../controllers/admin");
const router = (0, express_1.Router)();
router.get("/:id", getShipment);
router.post("/create", createShipment);
module.exports = router;

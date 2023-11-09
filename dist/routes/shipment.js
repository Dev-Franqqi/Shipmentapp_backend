"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("../controllers/admin");
const router = (0, express_1.Router)();
router.get("/shipments/:id", admin_1.getShipment);
router.post("/shipment/create", admin_1.createShipment);
module.exports = router;

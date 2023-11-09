import { Router } from "express";
import { getShipment,createShipment } from "../controllers/admin";

const router  =Router()

router.get("/shipments/:id", getShipment);

router.post("/shipment/create", createShipment);

module.exports = router;
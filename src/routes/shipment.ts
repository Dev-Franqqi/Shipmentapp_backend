import { Router } from "express";
import { getShipment,createShipment,updateShipmentLocation,updateShipmentStatus } from "../controllers/admin";

const router  =Router()

router.get("/shipments/:id", getShipment);

router.post("/shipment/create", createShipment);

router.put("/shipment/location/:id", updateShipmentLocation)
router.put("/shipment/status/:id",updateShipmentStatus)
module.exports = router;
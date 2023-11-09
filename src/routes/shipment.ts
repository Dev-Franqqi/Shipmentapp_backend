import { Router } from "express";
import { getShipment,createShipment,updateShipmentLocation,updateShipmentStatus,getAllUsers,deleteUser } from "../controllers/admin";

const router  =Router()

router.get("/shipments/:id", getShipment);
router.get('/users',getAllUsers)

router.post("/shipment/create", createShipment);

router.delete("/users/:id",deleteUser)

router.put("/shipment/location/:id", updateShipmentLocation)
router.put("/shipment/status/:id",updateShipmentStatus)
module.exports = router;
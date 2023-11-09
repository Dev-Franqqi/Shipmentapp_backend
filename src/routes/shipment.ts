import { Router } from "express";
const {
    getShipment,
    createShipment
} = require("../controllers/admin")


const router  =Router()

router.get("/:id", getShipment);

router.post("/create", createShipment);

module.exports = router;
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Shipment = require("../schema/product");
const getShipment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { id } = req.param.id;
    // try {
    //     const shipment = await Shipment.findOne({ id })
    //     if (!shipment) {
    //         res.status(404).json({error:"Shipment not found"})
    //     }
    //     else {
    //         res.status(200).json(shipment)
    //     }
    // }
    // catch (error) {
    //     res.status(400).json({error:error.message})
    // }
});
const createShipment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shipItem = req.body;
    try {
        const product = yield Shipment.createItem(shipItem);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = {
    getShipment,
    createShipment
};

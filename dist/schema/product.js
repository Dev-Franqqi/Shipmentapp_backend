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
const mongoose = require('mongoose');
const { Docment } = mongoose;
const mongoose_1 = require("mongoose");
const ShipmentSchema = new mongoose_1.Schema({
    tracking_number: { type: String, required: true },
    sender: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postal_code: { type: String, required: true },
        country: { type: String, required: true },
        contact: { type: String, required: true },
    },
    recipient: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postal_code: { type: String, required: true },
        country: { type: String, required: true },
        contact: { type: String, required: true },
    },
    items: [
        {
            item_id: { type: String, required: true },
            description: { type: String, required: true },
            quantity: { type: Number, required: true },
            weight: { type: String, required: true },
            dimensions: { type: String, required: true },
            value: { type: String, required: true },
        },
    ],
    shipment_date: { type: String, required: true },
    carrier: { type: String, required: true },
    status: { type: String, required: true },
    estimated_delivery_date: { type: String, required: true },
    current_location: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        postal_code: { type: String, required: true },
        country: { type: String, required: true },
    },
});
function findEmptyProperties(obj) {
    const emptyProperties = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
                emptyProperties.push(key);
            }
        }
    }
    if (emptyProperties.length === 0) {
        return null; // Return null if there are no empty properties
    }
    return emptyProperties;
}
function generateTrackingNumber() {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    const trackingNumberLength = 10; // You can adjust the length as needed
    let trackingNumber = '';
    while (trackingNumber.length < trackingNumberLength) {
        const randomChar = String.fromCharCode(Math.floor(Math.random() * 36) + 48);
        if (alphanumericRegex.test(randomChar)) {
            trackingNumber += randomChar;
        }
    }
    return trackingNumber;
}
ShipmentSchema.statics.createItem = function (shipmentData) {
    return __awaiter(this, void 0, void 0, function* () {
        const emptyFields = yield findEmptyProperties(shipmentData);
        if (emptyFields) {
            const StringFields = emptyFields.join(", ");
            throw new Error(`Please fill in remaining fields: ${StringFields}`);
        }
        const trackingNumber = yield generateTrackingNumber();
        const shipment = Object.assign({ trackingNumber }, shipmentData);
        const product = yield this.create(shipment);
        return product;
    });
};
const ShipmentModel = mongoose.model("Shipment", ShipmentSchema);
module.exports = ShipmentModel;

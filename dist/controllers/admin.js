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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateShipmentStatus = exports.updateShipmentLocation = exports.createShipment = exports.getShipment = exports.deleteUser = exports.getAllUsers = void 0;
const product_1 = __importDefault(require("../schema/product"));
const User = require("../schema/user");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        if (!users) {
            res.status(404).json({ error: "No users found" });
            return;
        }
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield User.findOneAndDelete({ _id: id });
        if (!user) {
            res.status(404).json({ error: "User does not exist" });
            return;
        }
        res.status(200).json({ message: "User Deleted" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
const getShipment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    try {
        const product = yield product_1.default.findOne({ tracking_number: id });
        if (!product) {
            res.status(404).json({ error: "There is no available shipment with that tracking number" });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getShipment = getShipment;
const createShipment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shipItem = req.body;
    try {
        const product = yield product_1.default.createItem(shipItem);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createShipment = createShipment;
const updateShipmentLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const current_location = req.body;
    try {
        const doc = yield product_1.default.findOneAndUpdate({ tracking_number: id }, { current_location: current_location }, {
            new: true
        });
        if (!doc) {
            res.status(404).json({ error: "Could not find document" });
        }
        res.status(200).json(doc);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateShipmentLocation = updateShipmentLocation;
const updateShipmentStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const status = req.body;
    try {
        const doc = yield product_1.default.findOneAndUpdate({ tracking_number: id }, status, {
            new: true,
        });
        if (!doc) {
            res.status(404).json({ error: "Could not find document" });
        }
        res.status(200).json(doc);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateShipmentStatus = updateShipmentStatus;

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
const User = require("../schema/user");
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        yield User.login(email, password);
        res.status(200).json({ email, password });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password, country } = req.body;
    try {
        yield User.signup(firstname, lastname, email, password, country);
        res.status(200).json({ firstname, lastname, email, password, country });
    }
    catch (error) {
        console.error("Error caught:", error.message); // Add this line for debugging
        res.status(400).json({ error: error.message });
    }
});
module.exports = {
    loginController,
    signupController
};

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
const mongoose_1 = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    country: { type: String, required: true }
});
userSchema.statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!email || !password) {
            throw new Error("Please fill in all fields");
        }
        const user = yield this.findOne({ email });
        if (!user) {
            throw new Error("Invalid Email");
        }
        const match = yield bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("Invalid Password");
        }
        return user;
    });
};
userSchema.statics.signup = function (firstname, lastname, email, password, country) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!firstname || !password || !email || !password || !country) {
            throw new Error("Please fill in all fields");
        }
        if (!validator.isEmail(email)) {
            throw Error("Please Enter a valid Email");
        }
        if (!validator.isStrongPassword(password)) {
            throw Error("Password not strong enough");
        }
        const exists = yield this.findOne({ email });
        if (exists) {
            throw Error("User already exists");
        }
        const salt = yield bcrypt.genSalt(10);
        const hash = yield bcrypt.hash(password, salt);
        const user = yield this.create({ firstname, lastname, email, password, country });
        return user;
    });
};
const User = (0, mongoose_1.model)("User", userSchema);
module.exports = User;

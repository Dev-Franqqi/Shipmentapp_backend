"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const { loginController, signupController } = require("../controllers/userController");
router.post('/login', loginController);
router.post('/signup', signupController);
module.exports = router;

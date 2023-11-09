const express = require("express")
const router = express.Router()
const { loginController, signupController } = require("../controllers/userController")

import { Response } from "express"





router.post('/login', loginController)
router.post('/signup', signupController)

module.exports = router
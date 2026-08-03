import { register } from "../controllers/auth.controller.js";
import { registerValidation } from "../validations/auth.validator.js";

import express from 'express'

const authRouter  = express.Router()

authRouter.post('/register',registerValidation,register)

export default authRouter
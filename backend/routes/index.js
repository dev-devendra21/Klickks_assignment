import express from "express";

import {
  loginUserController,
  createUserController,
  logoutUserController,
} from "../controllers/user.js";
import { validate } from "../validator/validate.js";
import { userSchema, loginSchema } from "../validator/schema/user.js";

const router = express.Router();

router.post("/user/login", validate(loginSchema), loginUserController);
router.post("/user/register", validate(userSchema), createUserController);
router.get("/user/logout", logoutUserController);

export default router;

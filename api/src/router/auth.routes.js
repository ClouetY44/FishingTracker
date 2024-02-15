import express from "express";

import { register, login, logout, checkToken } from "../controllers/auth.js";
import auth from "../middlewares/auth.js"

const router = express.Router();

router.post("/register", register);
router.post("/login", login)


router.get("/logout", logout)
router.get("/check-token", auth, checkToken);


export default router;
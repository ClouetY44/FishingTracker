import express from "express";

import { register, login, logout, checkToken } from "../controllers/auth.js";

const router = express.Router();

// Routes liés a l'authetification

//préfixe : /api/auth
router.post("/register", register);
router.post("/login", login)


router.get("/logout", logout)
router.get("/check-token", checkToken);


export default router;
import express from "express";

import adminAuth from "../middlewares/adminAuth.js"
import userAuth from "../middlewares/userAuth.js"

import app_routes from "./app.routes.js"
import auth_routes from "./auth.routes.js"
import admin_routes from "./admin.routes.js"

import user_routes from "./user.routes.js"

const router = express.Router();

// Router principal

//préfixe : /api
router.use("/app", app_routes) /*pas de connexion requise*/
router.use("/auth", auth_routes) /*authentification*/
router.use("/admin", adminAuth, admin_routes) /*connexion admin requise*/
router.use("/user", userAuth, user_routes) /*connexion pêcheur requise*/

export default router;
import express from "express";

import adminAuth from "../middlewares/adminAuth.js"
import ownerAuth from "../middlewares/ownerAuth.js"
import userAuth from "../middlewares/userAuth.js"

import app_routes from "./app.routes.js"
import auth_routes from "./auth.routes.js"
import admin_routes from "./admin.routes.js"
import owner_routes from "./owner.routes.js"
import user_routes from "./user.routes.js"

const router = express.Router();

router.use("/app", app_routes);
router.use("/auth", auth_routes)
router.use("/admin", adminAuth, admin_routes)
router.use("/owner", ownerAuth, owner_routes)
router.use("/user", userAuth, user_routes)

export default router;
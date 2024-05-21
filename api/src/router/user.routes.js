import express from "express"
import uploadFile from "../middlewares/multer.js"

import { getMethod, getWeather, getFish, getLake, getCatch, updateInfos ,getUserInfo, changePassword ,postCatch } from "../controllers/user/index.js"

const router = express.Router()

// Routes pour les utilisateurs

//préfixe : /api/user
router.get("/userInfos", getUserInfo)
router.get("/catch", getCatch)
router.get("/lake", getLake)
router.get("/fish", getFish)
router.get("/weather", getWeather)
router.get("/method", getMethod)

router.post("/catch", uploadFile, postCatch)

router.put("/updateInfos", updateInfos)
router.put("/changePassword", changePassword)

export default router
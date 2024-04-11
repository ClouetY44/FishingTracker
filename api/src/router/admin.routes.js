import express from "express"

import {getLake, getFish, getCountUser, getCountFish, getCountLake, getCountCatch, getRole, getUser, updateRole, deleteUser, deleteLake, deleteFish} from "../controllers/admin/index.js"

const router = express.Router()

//préfixe : /api/admin
router.get("/role", getRole)
router.get("/user", getUser)
router.get("/lake", getLake)
router.get("/fish", getFish)
router.get("/numberOfUser", getCountUser)
router.get("/numberOfFish", getCountFish)
router.get("/numberOfLake", getCountLake)
router.get("/numberOfCatch", getCountCatch)

router.put("/updateRole", updateRole)

router.delete("/ban", deleteUser)
router.delete("/deleteLake", deleteLake)
router.delete("/deleteFish", deleteFish)

export default router
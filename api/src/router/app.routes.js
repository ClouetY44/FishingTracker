import express from "express";

import { getAllLake,getAllFish,getHome,getAllCatch, getCatch,getLake,getFish } from "../controllers/app.js";

const router = express.Router();

// Routes de l'application

//préfixe : /api/app
router.get("/lake", getAllLake);
router.get("/fish", getAllFish);
router.get("/lake/:id", getLake)
router.get("/fish/:id", getFish)
router.get("/home", getHome)
router.get("/catch", getAllCatch)
router.get("/catch/:id", getCatch)

export default router;
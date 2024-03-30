import express from "express";

import { getAllLake,getAllFish,getAllArticle,getArticle,getAllMethod,getComment,getHome,getAllCatch, getCatch,getLake,getFish } from "../controllers/app.js";

const router = express.Router();

router.get("/lake", getAllLake);
router.get("/fish", getAllFish);
router.get("/method", getAllMethod)
router.get("/article", getAllArticle)
router.get("/comment/:id", getComment)
router.get("/article/:id", getArticle)
router.get("/lake/:id", getLake)
router.get("/fish/:id", getFish)
router.get("/home", getHome)
router.get("/catch", getAllCatch)
router.get("/catch/:id", getCatch)

export default router;
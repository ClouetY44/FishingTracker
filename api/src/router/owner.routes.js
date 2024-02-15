import express from "express"

import { getAllCatch, updateArticle, postArticle,deleteArticle,postComment,updateComment,deleteComment } from "../controllers/owner/index.js"

const router = express.Router()

router.get("/report",getAllCatch)

router.post("/article", postArticle)
router.post("/comment", postComment)

router.patch("/article/update", updateArticle)
router.patch("/comment/update", updateComment)

router.delete("/article/delete", deleteArticle)
router.delete("/comment/delete", deleteComment)

export default router
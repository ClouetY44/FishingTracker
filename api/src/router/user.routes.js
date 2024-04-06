import express from "express"

import { postCatch, postArticle, postComment, updateCatch, updateArticle, updateComment, deleteCatch, deleteArticle, deleteComment } from "../controllers/user/index.js"

const router = express.Router()

//préfixe : /api/user
router.post("/catch", postCatch)
router.post("/article", postArticle)
router.post("/comment", postComment)


router.patch("/catch/update", updateCatch)
router.patch("/article/update", updateArticle)
router.patch("/comment/update", updateComment)


router.delete("/catch/delete", deleteCatch)
router.delete("/article/delete", deleteArticle)
router.delete("/comment/delete", deleteComment)

export default router
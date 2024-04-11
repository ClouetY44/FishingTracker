import express from "express"

import { getCatch, updateInfos ,getUserInfo, changePassword ,postCatch, postArticle, postComment, updateCatch, updateArticle, updateComment, deleteCatch, deleteArticle, deleteComment } from "../controllers/user/index.js"

const router = express.Router()

//préfixe : /api/user
router.get("/userInfos", getUserInfo)
router.get("/catch", getCatch)

router.post("/catch", postCatch)
router.post("/article", postArticle)
router.post("/comment", postComment)

router.put("/updateInfos", updateInfos)
router.put("/changePassword", changePassword)

router.patch("/catch/update", updateCatch)
router.patch("/article/update", updateArticle)
router.patch("/comment/update", updateComment)


router.delete("/catch/delete", deleteCatch)
router.delete("/article/delete", deleteArticle)
router.delete("/comment/delete", deleteComment)

export default router
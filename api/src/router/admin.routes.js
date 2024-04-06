import express from "express"

import { updateRole, deleteUser,deleteCatch,deleteArticle,deleteComment } from "../controllers/admin/index.js"

const router = express.Router()

//préfixe : /api/admin
router.patch("/role", updateRole)

router.delete("/ban", deleteUser)
router.delete("/catch", deleteCatch)
router.delete("/article", deleteArticle)
router.delete("/comment", deleteComment)

export default router
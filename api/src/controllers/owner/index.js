import Query from "../../model/Query.js";

const getAllCatch = async (req,res) => {
    try {
        const { lake } = req.body
        const query = "SELECT * FROM catch WHERE lake_id = ?"
        const catches = await Query.runWithParams(query, [lake])
        res.json(catches);
    } catch {
        res.status(500).json({msg: error})
    }
}

// ARTICLE
const postArticle = async (req,res) => {
    try {
        const { Title, Content, users_id } = req.body
        const queryArticle = "INSERT INTO articles (id, Title, Content, PublicationDate, users_id) VALUES (NULL,?,?,NOW(),?)"
        await Query.runWithParams(queryArticle, [Title, Content, users_id])
        res.json({ message: "Article créé avec succès"});
    } catch {
        res.status(500).json({msg: error}) 
    }
}

const updateArticle = async (req,res) => {
    try {
        const { title, content, id } = req.body
        const query = "UPDATE articles SET Title = ?, Content = ?, PublicationDate = NOW() WHERE id = ?"
        await Query.runWithParams(query, [title, content, id])
        res.json({ message: "Mise à jour réussi" });
    } catch {
        res.status(500).json({msg: "error"})
    }
}

const deleteArticle = async (req,res) => {
    try {
        const { id } = req.body
        const query = "DELETE FROM articles WHERE id = ?"
        await Query.runWithParams(query, [id])
        res.json({ message: "article supprimé"});
    } catch {
        res.status(500).json({msg: "error"})
    }
}

// COMMENT
const postComment = async (req,res) => {
    try {
        const { Content, users_id, articles_id } = req.body
        const queryArticle = "INSERT INTO comment (id, Content, PublicationDate, users_id, articles_id) VALUES (NULL,?,NOW(),?,?)"
        await Query.runWithParams(queryArticle, [Content, users_id, articles_id])
        res.json({ message: "Commentaire créé avec succès"});
    } catch {
        res.status(500).json({msg: error}) 
    }
}

const updateComment = async (req,res) => {
    try {
        const { content, users_id, articles_id, id } = req.body
        const query = "UPDATE comment SET Content = ?, PublicationDate = NOW(), users_id = ?, articles_id = ? WHERE id = ?"
        await Query.runWithParams(query, [content, users_id, articles_id, id])
        res.json({ message: "Mise à jour réussi" });
    } catch {
        res.status(500).json({msg: "error"})
    }
}

const deleteComment = async (req,res) => {
    try {
        const { id } = req.body
        const query = "DELETE FROM comment WHERE id = ?"
        await Query.runWithParams(query, [id])
        res.json({ message: "commentaire supprimé"});
    } catch {
        res.status(500).json({msg: "error"})
    }
}

export {getAllCatch,updateArticle,postArticle,deleteArticle,postComment,updateComment,deleteComment}
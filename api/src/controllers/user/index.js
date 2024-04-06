import Query from "../../model/Query.js";

// CATCH
// Ajoute une nouvelle capture
const postCatch = async (req,res) => {
    try {
        const { Length, Weight, Description, Wind, Capture, users_id, lake_id, fish_id, weather_id } = req.body
        const queryCatch = "INSERT INTO catch (id, Length, Weight, Catch_Date, Description, Wind, Capture, users_id, lake_id, fish_id, weather_id) VALUES (NULL,?,?,NOW(),?,?,?,?,?,?,?)"
        await Query.runWithParams(queryCatch, [Length, Weight, Description, Wind, Capture, users_id, lake_id, fish_id, weather_id])
        res.json({ message: "Post créé avec succès"});
    } catch {
        res.status(500).json({msg: error})
    }
}

// Met à jour une capture existante
const updateCatch = async (req,res) => {
    try {
        const { length,weight,description,wind,lake_id,fish_id,weather_id,id } = req.body
        const query = "UPDATE catch SET Length = ?, Weight = ?, Catch_Date = NOW(), Description = ?, Wind = ?, lake_id = ?, fish_id = ?, weather_id = ? WHERE id = ?"
        await Query.runWithParams(query, [length,weight,description,wind,lake_id,fish_id,weather_id,id])
        res.json({ message: "Mise à jour réussi" });
    } catch {
        res.status(500).json({msg: "error"})
    }
}

// Supprime une capture
const deleteCatch = async (req,res) => {
    try {
        const { id } = req.body
        const query = "DELETE FROM catch WHERE id = ?"
        await Query.runWithParams(query, [id])
        res.json({ message: "post supprimé"});
    } catch {
        res.status(500).json({msg: "error"})
    }
}

// ARTICLE
// Ajoute un nouvel article
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

// Met à jour un article existant
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

// Supprime un article
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
// Ajoute un nouveau commentaire à un article
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


// Met à jour un commentaire existant
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

// Supprime un commentaire
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

export {postCatch,postArticle,postComment,updateCatch,updateArticle,updateComment,deleteCatch,deleteArticle,deleteComment}
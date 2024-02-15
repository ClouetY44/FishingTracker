import Query from "../../model/Query.js";

// CATCH
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

const updateCatch = async (req,res) => {
    
}

const deleteCatch = async (req,res) => {
    
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
    
}

const deleteArticle = async (req,res) => {
    
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
    
}

const deleteComment = async (req,res) => {
    
}

export {postCatch,postArticle,postComment,updateCatch,updateArticle,updateComment,deleteCatch,deleteArticle,deleteComment}
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

const postArticle = async (req,res) => {
    
}

const deleteArticle = async (req,res) => {
    
}

const postComment = async (req,res) => {
    
}

const updateComment = async (req,res) => {
    
}

const deleteComment = async (req,res) => {
    
}

export {getAllCatch,updateArticle,postArticle,deleteArticle,postComment,updateComment,deleteComment}
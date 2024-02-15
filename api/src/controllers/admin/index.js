import Query from "../../model/Query.js";

const updateRole = async (req,res) => {
    try {
        const { role, username } = req.body
        const query = "UPDATE users SET roles_id = ? WHERE username = ?"
        await Query.runWithParams(query, [role, username])
        res.json({ message: "Mise à jour réussi", username, role });
    } catch {
        res.status(500).json({msg: "error"})
    }
}

const deleteUser = async (req,res) => {
    try {
        const { username } = req.body
        const query = "DELETE FROM users WHERE username = ?"
        await Query.runWithParams(query, [username])
        res.json({ message: "Utilisateur supprimé", username});
    } catch {
        res.status(500).json({msg: "error"})
    }
}

const deleteCatch = async (req,res) => {
    
}

const deleteArticle = async (req,res) => {
    
}

const deleteComment = async (req,res) => {
    
}

export {updateRole,deleteUser,deleteCatch,deleteArticle,deleteComment}
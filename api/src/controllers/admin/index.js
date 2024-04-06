import Query from "../../model/Query.js";

// Fonction pour mettre à jour le rôle d'un utilisateur
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

// Fonction pour supprimer un utilisateur
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

// Fonction pour supprimer un élément de la table "catch"
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

// Fonction pour supprimer un article
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

// Fonction pour supprimer un commentaire
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

export {updateRole,deleteUser,deleteCatch,deleteArticle,deleteComment}
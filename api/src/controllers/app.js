import Query from "../model/Query.js";

const getAllLake = async (req,res) => {
    try {
        const queryLake = "SELECT * FROM lake"
        const lakes = await Query.run(queryLake)
        console.log(lakes)
        res.json(lakes)
    } catch {
        res.status(500).json({msg: error})
    }
}

const getAllFish = async (req,res) => {
    try {
        const queryFish = "SELECT * FROM fish"
        const fishs = await Query.run(queryFish)
        console.log(fishs)
        res.json(fishs)
    } catch {
        res.status(500).json({msg: error})
    }
}

const getAllMethod = async (req,res) => {
    try {
        const queryMethod = "SELECT * FROM method"
        const methods = await Query.run(queryMethod)
        console.log(methods)
        res.json(methods)
    } catch {
        res.status(500).json({msg: error})
    }
}

const getAllArticle = async (req,res) => {
    try {
        const queryAllArticle = "SELECT * FROM articles"
        const articles = await Query.run(queryAllArticle)
        console.log(articles)
        res.json(articles)
    } catch {
        res.status(500).json({msg: error})
    }
}

const getArticle = async (req,res) => {
    try { 
        const { id } = req.params;
        const queryArticle = "SELECT * FROM articles WHERE id = ?"
        const article = await Query.runWithParams(queryArticle, [id]);
        res.json(article);
    } catch (error) {
        console.log(error);
    }
}

const getComment = async (req,res) => {
    try { 
        const { id } = req.params;
        const queryComment = "SELECT * FROM comment WHERE articles_id = ?"
        const comments = await Query.runWithParams(queryComment, [id]);
        res.json(comments);
    } catch (error) {
        console.log(error);
    }
}

const getFishCategories = async (req,res) => {
    try {
        const queryCategorie = "SELECT * FROM categories"
        const categories = await Query.run(queryCategorie)
        res.json(categories)
    } catch {
        res.status(500).json({msg: error})
    }
}

const getAllCatch = async (req,res) => {
    try {
        const queryAllCatch = "SELECT * FROM catch"
        const catches = await Query.run(queryAllCatch)
        res.json(catches)
    } catch {
        res.status(500).json({msg: error})
    }
}

const getCatch = async (req,res) => {
    try { 
        const { id } = req.params;
        const queryCatch = "SELECT * FROM catch WHERE id = ?"
        const catchData = await Query.runWithParams(queryCatch, [id]);
        res.json(catchData);
    } catch (error) {
        console.log(error);
    }
}

const getLake = async (req,res) => {
    
}

const getFish = async (req,res) => {
    
}

export {getAllLake,getAllFish,getAllMethod,getAllArticle,getComment,getArticle,getFishCategories,getAllCatch,getCatch,getLake,getFish}
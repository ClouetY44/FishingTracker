import Query from "../model/Query.js";

// LAKE
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

const getLake = async (req,res) => {
    try { 
        const { id } = req.params;
        const queryLake = "SELECT * FROM lake WHERE id = ?"
        const lake = await Query.runWithParams(queryLake, [id]);
        res.json(lake);
    } catch (error) {
        console.log(error);
    }
}

// FISH
const getFishCategories = async (req,res) => {
    try {
        const queryCategorie = "SELECT * FROM categories"
        const categories = await Query.run(queryCategorie)
        res.json(categories)
    } catch {
        res.status(500).json({msg: error})
    }
}

const getAllFish = async (req,res) => {
    try {
        const queryFish = "SELECT fish.id, Title, Description, categories_id, pictures_fish.Src, pictures_fish.Alt FROM fish INNER JOIN pictures_fish on fish.id=pictures_fish.fish_id"
        const fishs = await Query.run(queryFish)
        console.log(fishs)
        res.json(fishs)
    } catch {
        res.status(500).json({msg: error})
    }
}

const getFish = async (req,res) => {
    try { 
        const { id } = req.params;
        const queryFish = "SELECT fish.id, Title, Description, Size, Weight, Season, Longevity, Technical, Secondary_src, Secondary_alt categories_id, pictures_fish.Src, pictures_fish.Alt, categories.Label FROM fish INNER JOIN pictures_fish on fish.id=pictures_fish.fish_id INNER JOIN categories on categories_id=categories.id WHERE fish.id = ?"
        const fish = await Query.runWithParams(queryFish, [id]);
        res.json(fish);
    } catch (error) {
        console.log(error);
    }
}

// ARTICLE
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

// COMMENT
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

// CONTENT
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

const getAllCatch = async (req,res) => {
    try {
        const queryAllCatch = "SELECT catch.id, Description, users_id, pictures_catch.Src, pictures_catch.Alt, users.Username FROM catch INNER JOIN pictures_catch ON catch.id=pictures_catch.catch_id INNER JOIN users ON users_id=users.id"
        const catches = await Query.run(queryAllCatch)
        res.json(catches)
    } catch {
        res.status(500).json({msg: error})
    }
}

const getCatch = async (req,res) => {
    try { 
        const { id } = req.params;
        const queryCatch = "SELECT catch.id, catch.Description,lake.Title, Length, catch.Weight, Catch_Date, Wind, Released, pictures_catch.Src, pictures_catch.Alt, users.Username, weather.Title AS Weather, method.Title AS Method, fish.Title AS Fish FROM catch INNER JOIN pictures_catch ON catch.id=pictures_catch.catch_id INNER JOIN users ON users_id=users.id INNER JOIN lake on lake_id=lake.id INNER JOIN weather ON weather_id=weather.id INNER JOIN method on method_id=method.id INNER JOIN fish on fish_id=fish.id WHERE catch.id = ?"
        const catchData = await Query.runWithParams(queryCatch, [id]);
        res.json(catchData);
    } catch (error) {
        console.log(error);
    }
}

export {getAllLake,getAllFish,getAllMethod,getAllArticle,getComment,getArticle,getFishCategories,getAllCatch,getCatch,getLake,getFish}
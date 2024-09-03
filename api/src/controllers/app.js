import Query from "../model/Query.js";

// Récupère des données pour la page d'accueil
const getHome = async (req,res) => {
    try {
        const querySlider = "SELECT * FROM ( (SELECT pictures_catch.Src, pictures_catch.Alt FROM catch INNER JOIN pictures_catch ON catch.id = pictures_catch.catch_id ORDER BY RAND() LIMIT 3) UNION (SELECT pictures_fish.Src, pictures_fish.Alt FROM fish INNER JOIN pictures_fish ON fish.id = pictures_fish.fish_id ORDER BY RAND() LIMIT 3) UNION (SELECT Secondary_src, Secondary_alt FROM lake ORDER BY RAND() LIMIT 3) ) AS random_result ORDER BY RAND()"
        const slider = await Query.run(querySlider)
        res.json(slider)
    } catch {
        res.status(500).json({msg: error})
    }
}

// Récupère tous les étangs
const getAllLake = async (req,res) => {
    try {
        const queryLake = "SELECT lake.id, Adress, Private, Title, Src, Alt, Description FROM lake ORDER BY Title ASC"
        const lakes = await Query.run(queryLake)
        res.json(lakes)
    } catch {
        res.status(500).json({msg: error})
    }
}

// Récupère un lac spécifique
const getLake = async (req,res) => {
    try { 
        const { id } = req.params;
        const queryLake = "SELECT lake.id, Title, Secondary_src, secondary_alt, Description, Adress, Surface, Private, Period, Number_rods, Night, Lure, Card, Day_price, Year_price FROM lake WHERE lake.id = ?"
        const lake = await Query.runWithParams(queryLake, [id]);
        res.json(lake);
    } catch (error) {
        console.log(error);
    }
}

// Récupère tous les poissons
const getAllFish = async (req,res) => {
    try {
        const queryFish = "SELECT fish.id, fish.Title, fish.Description, fish.categories_id, categories.Label, pictures_fish.Src, pictures_fish.Alt FROM fish INNER JOIN pictures_fish ON fish.id = pictures_fish.fish_id INNER JOIN categories ON fish.categories_id = categories.id ORDER BY fish.Title ASC;"
        const fishs = await Query.run(queryFish)
        res.json(fishs)
    } catch {
        res.status(500).json({msg: error})
    }
}

// Récupère un poisson spécifique
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

// Récupère toutes les captures
const getAllCatch = async (req,res) => {
    try {
        const queryAllCatch = "SELECT lake.Title AS lake_title, catch.id, catch.users_id, pictures_catch.Src, pictures_catch.Alt, users.Username, catch.Catch_Date FROM catch INNER JOIN pictures_catch ON catch.id = pictures_catch.catch_id INNER JOIN lake ON catch.lake_id = lake.id INNER JOIN users ON catch.users_id = users.id ORDER BY catch.Catch_Date DESC;"
        const catches = await Query.run(queryAllCatch)
        res.json(catches)
    } catch {
        res.status(500).json({msg: error})
    }
}

// Récupère une capture spécifique
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

export {getAllLake,getAllFish,getHome,getAllCatch,getCatch,getLake,getFish}
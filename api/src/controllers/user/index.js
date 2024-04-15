import bcrypt from "bcrypt";

import Query from "../../model/Query.js";

// Fonction pour récupérer le nom des methodes de pêche
const getMethod = async (req, res) => {
  try {
    const queryMethod = "SELECT Title FROM method ORDER BY Title ASC";
    const method = await Query.run(queryMethod);
    res.json(method);
  } catch {
    res.status(500).json({ msg: error });
  }
};

// Fonction pour récupérer les différentes météos
const getWeather = async (req, res) => {
  try {
    const queryWeather = "SELECT Title FROM weather ORDER BY Title ASC";
    const weather = await Query.run(queryWeather);
    res.json(weather);
  } catch {
    res.status(500).json({ msg: error });
  }
};

// Fonction pour récupérer les noms des étangs
const getLake = async (req, res) => {
  try {
    const queryLake = "SELECT Title FROM lake ORDER BY Title ASC";
    const lakes = await Query.run(queryLake);
    res.json(lakes);
  } catch {
    res.status(500).json({ msg: error });
  }
};

// Fonction pour récupérer les espèces de poissons
const getFish = async (req, res) => {
  try {
    const queryFish = "SELECT Title FROM fish ORDER BY Title ASC";
    const fishes = await Query.run(queryFish);
    res.json(fishes);
  } catch {
    res.status(500).json({ msg: error });
  }
};

// Fonction pour récupérer les informations d'un utilisateur
const getUserInfo = async (req, res) => {
  try {
    const { username } = req.query;
    const queryInfos =
      "SELECT Username, Birthdate, Email, CreatedAt FROM users WHERE Username = ?";
    const infos = await Query.runWithParams(queryInfos, [username]);
    res.json(infos);
  } catch {
    res.status(500).json({ msg: error });
  }
};

// Fonction pour récupérer les prises d'un utilisateur
const getCatch = async (req, res) => {
  try {
    const { username } = req.query;
    const queryCatch =
      "SELECT catch.id AS catch_id, pictures_catch.src, pictures_catch.alt FROM catch JOIN users ON catch.users_id = users.id JOIN pictures_catch ON catch.id = pictures_catch.catch_id WHERE users.username = ? ORDER BY Catch_Date";
    const userCatch = await Query.runWithParams(queryCatch, [username]);
    res.json(userCatch);
  } catch {
    res.status(500).json({ msg: error });
  }
};

// Fonction pour mettre a jour les données d'un utilisateur
const updateInfos = async (req, res) => {
  try {
    const { username } = req.query;
    const { birthdate, email } = req.body;
    const queryInfos =
      "UPDATE users SET Birthdate = ?, Email = ? WHERE Username = ?";
    const infos = await Query.runWithParams(queryInfos, [
      birthdate,
      email,
      username,
    ]);
    res.json(infos);
  } catch {
    res.status(500).json({ msg: "error" });
  }
};

// Fonction pour changer le mot de passe
const changePassword = async (req, res) => {
  try {
    const { username } = req.query;
    const { currentPassword, newPassword } = req.body;
    const queryPassword = "SELECT Password FROM users WHERE Username = ?";
    const user = await Query.runWithParams(queryPassword, [username]);
    if (!user || user.length === 0) {
      return res.status(400).json({ msg: "Utilisateur non trouvé" });
    }
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user[0].Password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({ msg: "Mot de passe actuel incorrect" });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const queryUpdatePassword =
      "UPDATE users SET Password = ? WHERE Username = ?";
    await Query.runWithParams(queryUpdatePassword, [
      hashedNewPassword,
      username,
    ]);

    res.json({ msg: "Mot de passe mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

// Fonction pour ajouter une nouvelle prise
const postCatch = async (req, res) => {
  try {
    const {
      user,
      lake,
      fish,
      weather,
      method,
      released,
      wind,
      length,
      weight,
      description,
      catch_Date,
      alt,
    } = req.body;

    const lakeQuery = "SELECT id FROM lake WHERE Title = ?";
    const lakeResult = await Query.runWithParams(lakeQuery, [lake]);
    const lakeId = lakeResult[0].id;

    const fishQuery = "SELECT id FROM fish WHERE Title = ?";
    const fishResult = await Query.runWithParams(fishQuery, [fish]);
    const fishId = fishResult[0].id;

    const weatherQuery = "SELECT id FROM weather WHERE Title = ?";
    const weatherResult = await Query.runWithParams(weatherQuery, [weather]);
    const weatherId = weatherResult[0].id;

    const methodQuery = "SELECT id FROM method WHERE Title = ?";
    const methodResult = await Query.runWithParams(methodQuery, [method]);
    const methodId = methodResult[0].id;

    const userQuery = "SELECT id FROM users WHERE Username = ?";
    const userResult = await Query.runWithParams(userQuery, [user]);
    const userId = userResult[0].id;

    const queryCatch =
      "INSERT INTO catch (Length, Weight, Catch_Date, Description, Wind, Released, users_id, lake_id, fish_id, weather_id, method_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    const catchResult = await Query.runWithParams(queryCatch, [
      length,
      weight,
      catch_Date,
      description,
      wind,
      released,
      userId,
      lakeId,
      fishId,
      weatherId,
      methodId,
    ]);

    const catchId = catchResult.insertId;

    const srcQuery =
      "INSERT INTO pictures_catch (Src, Alt, catch_id) VALUES (?, ?, ?)";
    const srcResult = await Query.runWithParams(srcQuery, [req.files[0].filename, alt, catchId]);

    res.json({ message: "Post créé avec succès" });
  } catch {
    res.status(500).json({ msg: "Erreur serveur" });
  }
};

export {
  getWeather,
  getMethod,
  getFish,
  getLake,
  getCatch,
  getUserInfo,
  updateInfos,
  changePassword,
  postCatch,
};
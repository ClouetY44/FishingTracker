import Query from "../model/Query.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Fonction pour l'enregistrement d'un nouvel utilisateur
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const query = "SELECT Username FROM users WHERE username = ?";
    const user = await Query.runWithParams(query, [username]);

    // Si l'utilisateur n'existe pas, procède à l'enregistrement
    if (!user.length) {
      const SALT = Number(process.env.B_SALT);
      const hash = await bcrypt.hash(password, SALT);
      const query =
        "INSERT INTO users (username, password, createdAt, roles_id) VALUES (?, ?, NOW(), 3)";
      const user = await Query.runWithParams(query, [username, hash]);

      // Vérifie si l'enregistrement s'est bien passé
      if (user.insertId) {
        res.status(201).json({ message: "Compte créé avec succès" });
        return;
      }
    }
    res.status(409).json({ message: "Compte non créé, veuillez réessayer" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Fonction pour la connexion d'un utilisateur existant
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const query =
      "SELECT username, password, roles_id FROM users WHERE username = ?";
    const [user] = await Query.runWithParams(query, [username]);

    // Vérifie si l'utilisateur existe et si le mot de passe correspond
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Identifiants incorrects" });
    }

     // Détermine le rôle de l'utilisateur en fonction de son rôle_id
    let role;
    switch (user.roles_id) {
      case 1:
        role = "admin";
        break;
      case 2:
        role = "propriétaire";
        break;
      default:
        role = "pêcheur";
    }

    // Génère un jeton d'authentification JWT avec les informations de l'utilisateur
    const TOKEN = jwt.sign(
      { id: user.id, username, role },
      process.env.SECRET_TOKEN,
      { expiresIn: "2h" }
    );

    // Ajoute le jeton d'authentification comme cookie dans la réponse
    res.cookie("TK_AUTH", TOKEN, {
      httpOnly: true,
      secure: true,
      maxAge: 7200000,
    });
    res.json({ message: "Connexion réussie", username: user.username, role});
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur, veuillez réessayer" });
  }
};

// Fonction pour la déconnexion d'un utilisateur
const logout = (req, res) => {
  res.clearCookie("TK_AUTH");
  res.json({ message: "Déconnexion effectuée" });
};

// Fonction pour vérifier le jeton d'authentification
const checkToken = (req, res) => {
  res.json({ user: req.user });
};

export { register, login, logout, checkToken };

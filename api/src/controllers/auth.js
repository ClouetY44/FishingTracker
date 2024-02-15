import Query from "../model/Query.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const query = "SELECT * FROM users WHERE username = ?";
    const user = await Query.runWithParams(query, [username]);

    if (!user.length) {
      const SALT = Number(process.env.B_SALT);
      const hash = await bcrypt.hash(password, SALT);
      const query =
        "INSERT INTO users (username, password, createdAt, roles_id) VALUES (?, ?, NOW(), 3)";
      const user = await Query.runWithParams(query, [username, hash]);

      if (user.insertId) {
        res.status(201).json({ message: "Compte créé avec succès" });
        return;
      }
    }
    res.status(409).json({ message: "Compte non créé, veuillez réessayer" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const query =
      "SELECT username, password, roles_id FROM users WHERE username = ?";
    const [user] = await Query.runWithParams(query, [username]);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Identifiants incorrects" });
    }
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
    const TOKEN = jwt.sign(
      { id: user.id, username, role },
      process.env.SECRET_TOKEN,
      { expiresIn: "2h" }
    );
    res.cookie("TK_AUTH", TOKEN, {
      httpOnly: true,
      secure: true,
      maxAge: 7200000,
    });
    res.json({ message: "Connexion réussie", username: user.username, role });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur serveur, veuillez réessayer" });
  }
};

const logout = (req, res) => {
  res.clearCookie("TK_AUTH");
  res.json({ message: "Déconnexion effectuée" });
};

const checkToken = (req, res) => {
  res.json({ user: req.user });
};

export { register, login, logout, checkToken };

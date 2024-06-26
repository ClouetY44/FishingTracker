import Query from "../../model/Query.js";

// Fonction pour récupérer le nombre d'utilisateur inscrit
const getCountUser = async (req, res) => {
  try {
    const queryCount = "SELECT COUNT(*) AS numberOfLines FROM users";
    const count = await Query.run(queryCount);
    res.json(count);
  } catch {
    res.status(500).json({ msg: error });
  }
};

// Fonction pour récupérer le nombre d'étang renseignés
const getCountLake = async (req, res) => {
  try {
    const queryCount = "SELECT COUNT(*) AS numberOfLines FROM lake";
    const count = await Query.run(queryCount);
    res.json(count);
  } catch {
    res.status(500).json({ msg: error });
  }
};

// Fonction pour récupérer le nombre de poissons renseignés
const getCountFish = async (req, res) => {
  try {
    const queryCount = "SELECT COUNT(*) AS numberOfLines FROM fish";
    const count = await Query.run(queryCount);
    res.json(count);
  } catch {
    res.status(500).json({ msg: error });
  }
};

// Fonction pour récupérer le nombre de prises renseignés
const getCountCatch = async (req, res) => {
  try {
    const queryCount = "SELECT COUNT(*) AS numberOfLines FROM catch";
    const count = await Query.run(queryCount);
    res.json(count);
  } catch {
    res.status(500).json({ msg: error });
  }
};

// Fonction pour récupérer les différents rôles
const getRole = async (req, res) => {
  try {
    const queryRole = "SELECT Label FROM roles";
    const roles = await Query.run(queryRole);
    res.json(roles);
  } catch {
    res.status(500).json({ msg: error });
  }
};

// Fonction pour récupérer les utilisateurs
const getUser = async (req, res) => {
  try {
    const queryUser = "SELECT Username FROM users ORDER BY Username ASC";
    const users = await Query.run(queryUser);
    res.json(users);
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

// Fonction pour récupérer les espèces de poisson
const getFish = async (req, res) => {
  try {
    const queryFish = "SELECT Title FROM fish ORDER BY Title ASC";
    const fishes = await Query.run(queryFish);
    res.json(fishes);
  } catch {
    res.status(500).json({ msg: error });
  }
};

// Fonction pour mettre à jour le rôle d'un utilisateur
const updateRole = async (req, res) => {
  const roleToRoleId = (roleName) => {
    switch (roleName) {
      case "admin":
        return 1;
      case "propriétaire":
        return 2;
      case "pêcheur":
        return 3;
      default:
        return null;
    }
  };
  try {
    const { role, username } = req.body;
    const roleId = roleToRoleId(role);
    const query = "UPDATE users SET roles_id = ? WHERE username = ?";
    await Query.runWithParams(query, [roleId, username]);
    res.json({ message: "Mise à jour réussi", username, role });
  } catch {
    res.status(500).json({ msg: "error" });
  }
};

// Fonction pour supprimer un utilisateur
const deleteUser = async (req, res) => {
  try {
    const { username } = req.body;
    const query = "DELETE FROM users WHERE username = ?";
    const result = await Query.runWithParams(query, [username]);
    if (result.affectedRows > 0) {
      res.json({ message: "Utilisateur supprimé", username });
    } else {
      res.status(404).json({ message: "Echec de la suppression" });
    }
  } catch {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
};

// Fonction pour supprimer un étang
const deleteLake = async (req, res) => {
  try {
    const { lake } = req.body;
    const query = "DELETE FROM lake WHERE Title = ?";
    const result = await Query.runWithParams(query, [lake]);
    if (result.affectedRows > 0) {
      res.json({ message: "Étang supprimé", lake });
    } else {
      res.status(404).json({ message: "Echec de la suppression" });
    }
  } catch {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'étang" });
  }
};

// Fonction pour supprimer un poisson
const deleteFish = async (req, res) => {
  try {
    const { fish } = req.body;
    const query = "DELETE FROM fish WHERE Title = ?";
    const result = await Query.runWithParams(query, [fish]);
    if (result.affectedRows > 0) {
      res.json({ message: "Poisson supprimé", fish });
    } else {
      res.status(404).json({ message: "Echec de la suppression" });
    }
  } catch {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du poisson" });
  }
};


export {
  getCountUser,
  getCountLake,
  getCountFish,
  getCountCatch,
  getRole,
  getUser,
  getLake,
  getFish,
  updateRole,
  deleteUser,
  deleteLake,
  deleteFish,
};

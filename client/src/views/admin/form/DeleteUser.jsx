import { useState, useEffect, useRef } from "react";

function DeleteUser() {
  // Référence pour l'élément de sélection de l'utilisateur à supprimer
  const deleteUserRef = useRef();

  // État pour afficher les messages
  const [msg, setMsg] = useState("");
  // État pour stocker la liste des utilisateurs
  const [users, setUsers] = useState([]);

  // Utilisation de useEffect pour mettre le focus sur l'utilisateur lorsqu'un message est affiché
  useEffect(() => {
    if (deleteUserRef.current) {
      deleteUserRef.current.focus();
    }
  }, [msg]);

  // Utilisation de useEffect pour récupérer la liste des utilisateurs depuis l'API au chargement du composant
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/user`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          setMsg("Erreur lors de la récupération des utilisateurs");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
    fetchUsers();
  }, []);

  // Fonction pour soumettre la demande de suppression d'un utilisateur
  const submitDeleteUser = async (e) => {
    try {
      e.preventDefault();
      const deleteUser = deleteUserRef.current.value;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/ban`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: deleteUser }),
          credentials: "include",
        }
      );
      if (response.ok) {
        setMsg("Utilisateur supprimé avec succès");
      } else setMsg("Utilisateur non supprimé");
    } catch (error) {
      setMsg("Erreur serveur");
    }
  };

  // Utilisation de useEffect pour effacer le message après 10 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg("");
    }, 10000);
  });

  // Rendu du composant
  return (
    <form onSubmit={submitDeleteUser}>
      <legend>Supprimer un utilisateur</legend>
      <label htmlFor="deleteUser">Nom d'utilisateur :</label>
      {users && users.length > 0 && (
        <select ref={deleteUserRef} id="deleteUser" name="deleteUser">
          {users.map((user, index) => (
            <option key={index} value={user.Username}>
              {user.Username}
            </option>
          ))}
        </select>
      )}
      <button type="submit">Supprimer l'utilisateur</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}

export default DeleteUser;

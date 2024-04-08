import { useState, useEffect, useRef } from "react";

function DeleteUser() {
  const deleteUserRef = useRef();

  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (deleteUserRef.current) {
      deleteUserRef.current.focus();
    }
  }, [msg]);

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
          setMsg("Erreur lors de la récupération des rôles");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
  fetchUsers();
}, []);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg("");
    }, 10000);
  });

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

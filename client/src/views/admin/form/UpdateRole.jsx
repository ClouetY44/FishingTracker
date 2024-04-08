import { useState, useEffect, useRef } from "react";

function UpdateRole() {
  const roleRef = useRef();
  const usernameRef = useRef();
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([])
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (roleRef.current) {
      roleRef.current.focus();
    }
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [msg]);

  useEffect(() => {
      const fetchRoles = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/admin/role`,
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
            setRoles(data);
          } else {
            setMsg("Erreur lors de la récupération des rôles");
          }
        } catch (error) {
          setMsg("Erreur serveur");
        }
      };
    fetchRoles();
  }, []);

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

  const submitUpdateRole = async (e) => {
    try {
      e.preventDefault();
      const role = roleRef.current.value;
      const username = usernameRef.current.value;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/updateRole`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: role, username: username }),
          credentials: "include",
        }
      );
      if (response.ok) {
        setMsg("Rôle modifié avec succès");
      } else setMsg("Echec de la modification");
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
    <form onSubmit={submitUpdateRole}>
      <legend>Modifier le rôle d'un utilisateur</legend>
      <label htmlFor="username">Nom d'utilisateur :</label>
      {users && users.length > 0 && (
          <select ref={usernameRef} id="username" name="username">
          {users.map((user, index) => (
              <option key={index} value={user.Username}>
              {user.Username}
            </option>
          ))}
        </select>
      )}
      <label htmlFor="role">Rôle :</label>
      {roles && roles.length > 0 && (
        <select ref={roleRef} id="role" name="role">
          {roles.map((role, index) => (
            <option key={index} value={role.Label}>
              {role.Label}
            </option>
          ))}
        </select>
      )}
      <button type="submit">Modifier le rôle</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}

export default UpdateRole;

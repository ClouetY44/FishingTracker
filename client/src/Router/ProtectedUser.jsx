import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Composant qui vérifie la connexion de l'utilisateur
function ProtectedUser({ child, redirectPath }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Fonction qui intéroge le token pour vérifier la connexion
    async function checkAuth() {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/check-token`,
        {
          credentials: "include",
        }
      );
      const result = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        navigate(redirectPath);
      }
    }
    checkAuth();
  }, []);

  if (isAuthenticated) return child;
}

export default ProtectedUser;

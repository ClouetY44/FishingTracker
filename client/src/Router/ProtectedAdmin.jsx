import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Composant qui vérifie la connexion de l'administrateur
function ProtectedAdmin({ child, redirectPath }) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
            // Fonction qui intéroge le token et dois récupérer le rôle admin pour poursuivre.
        async function checkAuth() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/check-token`,
                {
                    credentials: "include",
                }
            );
            const result = await response.json();
            if (response.ok && result.user.role === "admin") {
                setIsAuthenticated(true);
            } else {
                navigate(redirectPath);
            }
        }
         checkAuth();
    }, []);

    if (isAuthenticated) return child;
}

export default ProtectedAdmin;
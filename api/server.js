import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser"
import router from "./src/router/index.routes.js"

const app = express();
const PORT = process.env.LOCAL_PORT;

// Utiliser le middleware cookie-parser pour la gestion des cookies
app.use(cookieParser())

// Utiliser le middleware CORS pour permettre les requêtes cross-origin
app.use(
    cors({
        origin: process.env.URL,
        methods: ["GET", "POST", "DELETE", "PUT"], 
        credentials: true, 
    })
);

// Définir le chemin pour servir les images
app.use(
    "/img",
    express.static(path.join(process.cwd(), "public/assets/images"))
);

// Utiliser le middleware express.json() pour parser les données JSON dans les requêtes
app.use(express.json());

app.use("/api", router)

app.get("/", (req, res) => {
    res.json({ msg: "api is running" });
});

// Démarrer le serveur et écouter les connexions entrantes sur le port spécifié
app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}`)
);
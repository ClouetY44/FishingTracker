import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import router from "./router/index.routes.js"

const app = express();
const PORT = process.env.LOCAL_PORT;

app.use(cookieParser())

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PATCH"], 
        credentials: true, 
    })
);

app.use(express.json());

app.use("/api", router)

app.get("/", (req, res) => {
    res.json({ msg: "api is running" });
});

app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}`)
);
import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser"
import router from "./src/router/index.routes.js"

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

app.use(
    "/img",
    express.static(path.join(process.cwd(), "public/assets/images"))
);

app.use(express.json());

app.use("/api", router)

app.get("/", (req, res) => {
    res.json({ msg: "api is running" });
});

app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}`)
);
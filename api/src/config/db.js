import mysql from "mysql2/promise";

// Création d'un pool de connexions à la base de données MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Obtention d'une connexion à partir du pool de connexions
pool.getConnection().then((connection) => {
    console.log("Connected to database " + connection.config.database);
    // Libération de la connexion
    connection.release();
});

export default pool;
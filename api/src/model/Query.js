import pool from "../config/db.js";

// Définition de la classe Query
class Query {
    
    // Méthode statique pour exécuter une requête sans paramètres
    static async run(query) {
        const [result] = await pool.execute(query);
        return result;
    }

    // Méthode statique pour exécuter une requête avec des paramètres
    static async runWithParams(query, datas) {
        try {
            const [result] = await pool.execute(query, datas);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
}

export default Query;

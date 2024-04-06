import jwt from "jsonwebtoken"

// Middleware pour authentifier les requêtes avec JWT
const authenticateJWT = (req, res, next) => {
    const TOKEN = req.cookies.TK_AUTH
    if(!TOKEN){
        return res.status(400).json({error: "No token"})
    }

    // Vérifier la validité du jeton JWT en le décodant avec la clé secrète
    jwt.verify(TOKEN, process.env.SECRET_TOKEN, (err, decoded) => {
        if(err){
            console.log(err)
            return res.status(400).json({error:"Problem whith Token"})
        }

        // Vérifier le rôle décodé du jeton JWT
        if(decoded.role !== "admin"){
            return res.status(400).json({error:"admin required"})
        }
        req.user = decoded
        next()
    })
}

export default authenticateJWT
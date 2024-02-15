import jwt from "jsonwebtoken"

const authenticateJWT = (req, res, next) => {
    const TOKEN = req.cookies.TK_AUTH
    if(!TOKEN){
        return res.status(400).json({error: "No token"})
    }

    jwt.verify(TOKEN, process.env.SECRET_TOKEN, (err, decoded) => {
        if(err){
            console.log(err)
            return res.status(400).json({error:"Problem whith Token"})
        }
        if(decoded.role !== "propriétaire"){
            return res.status(400).json({error:"owner required"})
        }
        req.user = decoded
        next()
    })
}

export default authenticateJWT
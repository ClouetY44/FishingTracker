import multer from "multer";
import path from "path";

// Déclaration d'une variable pour stocker le chemin du répertoire de destination des fichiers
let newDirectory = "";

// Configuration du stockage des fichiers téléchargés
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    newDirectory = path.join(process.cwd(), "public/assets/images");
    cb(null, newDirectory)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Middleware pour gérer le téléchargement de fichiers
const uploadFile = (req, res, next) => {
  multer({
    storage: storage,
    limits: {
      fileSize: 4 * 1024 * 1024,
    },
    fileFilter: function (req, file, cb) {
      const fileExtension = /jpeg|png|jpg/;
      const checkExtension = fileExtension.test(
        path.extname(file.originalname).toLowerCase()
      );
      const checkMime = fileExtension.test(file.mimetype);
      if (checkMime && checkExtension) {
        return cb(null, true);
      } else {
        cb("Extension du fichier refusé");
      }
    },
  }).array("image", 1)(req, res, function (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    req.files.forEach(file => {
      file.path = file.path.split("public")[1];
    });

    // Appel de la fonction suivante dans la chaîne de middleware
    next();
  });
};

export default uploadFile;

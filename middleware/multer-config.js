const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // optionnel : limite de taille
  fileFilter: (req, file, callback) => {
    if (MIME_TYPES[file.mimetype]) {
      callback(null, true);
    } else {
      callback(new Error("Format de fichier non autorisé."), false);
    }
  },
}).single("image");

module.exports = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Erreurs liées à multer (limite de taille, etc.)
      console.error("Erreur Multer :", err);
      return res
        .status(400)
        .json({ error: "Erreur d'upload : " + err.message });
    } else if (err) {
      // Autres erreurs (ex : type MIME refusé)
      console.error("Erreur upload :", err);
      return res
        .status(400)
        .json({ error: "Erreur d'upload : " + err.message });
    }
    next();
  });
};

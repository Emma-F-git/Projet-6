const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/*Entregistrement des fichiers dans le dossier images*/
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },

  /*Mise en forme de l'image*/
  filename: (req, file, callback) => {
    const randomName = crypto.randomBytes(10).toString("hex");
    const ext = MIME_TYPES[file.mimetype];
    callback(null, `${randomName}.${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (MIME_TYPES[file.mimetype]) {
      callback(null, true);
    } else {
      callback(new Error("Format de fichier non autorisé."), false);
    }
  },
}).single("image");

module.exports = (req, res, next) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError || err) {
      return res
        .status(400)
        .json({ error: "Erreur d'upload : " + err.message });
    }

    if (!req.file) return next();

    const inputPath = req.file.path;
    const webpPath = inputPath.replace(path.extname(inputPath), ".webp");

    try {
      await sharp(inputPath)
        .resize({ width: 463, height: 595, fit: "cover" })
        .webp({ quality: 100 })
        .toFile(webpPath);

      fs.unlinkSync(inputPath);

      req.file.filename = path.basename(webpPath);
      req.file.path = webpPath;

      next();
    } catch (sharpError) {
      console.error("Erreur lors de la compression :", sharpError);
      return res
        .status(500)
        .json({ error: "Erreur lors de la compression de l'image." });
    }
  });
};

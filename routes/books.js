const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const booksCtrl = require("../controllers/books");

/*Routes CRUD création, lecture, modification, suppression*/
router.get("/", booksCtrl.getAllBooks);
router.post("/", auth, upload, booksCtrl.createBook);
router.get("/bestrating", booksCtrl.getBestRatedBooks);
router.get("/:id", booksCtrl.getOneBook);
router.post("/:id/rating", auth, booksCtrl.ratingBook);
router.put("/:id", auth, upload, booksCtrl.modifyBook);
router.delete("/:id", auth, booksCtrl.deleteBook);

module.exports = router;

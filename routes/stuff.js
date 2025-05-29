const express = require("express");
const auth = require("auth");
const router = express.Router();

const stuffCtrl = require("../controllers/stuff");

/*Routes CRUD création, lecture, modification, suppression*/
router.get("/", auth, stuffCtrl.getAllBooks);
router.post("/", auth, stuffCtrl.createBook);
router.get("/:id", auth, stuffCtrl.getOneBook);
router.put("/:id", auth, stuffCtrl.modifyBook);
router.delete("/:id", auth, stuffCtrl.deleteBook);

module.exports = router;

const express = require("express");
const router = express.Router();

const stuffCtrl = require("../controllers/stuff");

/*Routes CRUD création, lecture, modification, suppression*/
router.post("/", stuffCtrl.createBook);
router.put("/:id", stuffCtrl.modifyBook);
router.delete("/:id", stuffCtrl.deleteBook);
router.get("/:id", stuffCtrl.getOneBook);
router.get("/", stuffCtrl.getAllBooks);

module.exports = router;

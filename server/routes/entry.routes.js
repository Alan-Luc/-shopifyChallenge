const entry = require("../controllers/entryControllers");
const router = require("express").Router();

router.post("/", entry.create);

router.get("/", entry.getAll);

router.get("/:id", entry.getById);

router.put("/:id", entry.update);

router.patch("/:id", entry.trash);

module.exports = router;
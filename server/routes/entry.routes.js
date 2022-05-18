const entry = require("../controllers/entryControllers");
const router = require("express").Router();

router.post("/", entry.create);

router.get("/", entry.getAll);

router.get("/:id", entry.getById);

router.put("/:id", entry.update);

router.patch("/:id", entry.trash);

router.patch("/undo/:id", entry.undoTrash);

router.delete("/:id", entry.deleteById);

router.delete("/", entry.deleteAll);

module.exports = router;
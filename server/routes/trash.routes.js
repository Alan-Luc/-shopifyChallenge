const entry = require("../controllers/entryControllers");
const router = require("express").Router();

router.patch("/:id", entry.undoTrash);

router.get("/", entry.viewTrash);

router.get("/:id", entry.viewTrashById);

router.delete("/:id", entry.deleteById);

//empties trash
router.delete("/", entry.deleteAll);

module.exports = router;
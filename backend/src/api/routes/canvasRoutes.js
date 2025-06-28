const express = require("express");
const router = express.Router();
const canvasController = require("../controllers/canvasController");
const upload = require("../middleware/uploadMiddleware");

router.post("/initialize", canvasController.initializeCanvas);

router.post("/elements", upload.single("image"), canvasController.addElement);

router.get("/export/pdf", canvasController.exportAsPdf);

router.get("/preview", canvasController.getPreview);

router.post("/undo", canvasController.undo);
router.post("/redo", canvasController.redo);

module.exports = router;

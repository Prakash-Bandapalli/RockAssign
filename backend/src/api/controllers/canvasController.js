const CanvasService = require("../../services/canvasService");

exports.initializeCanvas = (req, res) => {
  try {
    const { width, height } = req.body;

    if (!width || !height || width <= 0 || height <= 0) {
      return res
        .status(400)
        .json({ message: "Invalid width or height provided." });
    }

    CanvasService.initialize(width, height);

    console.log(`Canvas initialized with dimensions: ${width}x${height}`);
    res
      .status(200)
      .json({ message: `Canvas initialized with ${width}x${height}.` });
  } catch (error) {
    console.error("Error initializing canvas:", error);
    res
      .status(500)
      .json({ message: "Server error while initializing canvas." });
  }
};

exports.addElement = async (req, res) => {
  try {
    const element = req.body;
    const file = req.file;

    if (!element || !element.type) {
      return res
        .status(400)
        .json({ message: "Invalid element data provided." });
    }

    await CanvasService.addElement(element, file);

    res.status(200).json({
      message: `Element of type '${element.type}' added successfully.`,
    });
  } catch (error) {
    console.error("Error adding element:", error.message);
    res.status(500).json({
      message: "Server error while adding element.",
      error: error.message,
    });
  }
};

exports.exportAsPdf = async (req, res) => {
  try {
    console.log("Request to export canvas as PDF.");

    let quality = 1.0;
    if (req.query.quality) {
      const parsedQuality = parseFloat(req.query.quality);
      // Ensure the value is within a reasonable range (0.1 to 1.0)
      if (!isNaN(parsedQuality) && parsedQuality > 0 && parsedQuality <= 1) {
        quality = parsedQuality;
      }
    }

    const pdfBuffer = await CanvasService.exportToPdf({ quality });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=canvas-export.pdf"
    );

    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error exporting PDF:", error.message);
    res.status(500).json({
      message: "Server error while exporting PDF.",
      error: error.message,
    });
  }
};

exports.getPreview = (req, res) => {
  try {
    const buffer = CanvasService.getCanvasBuffer();

    res.setHeader("Content-Type", "image/png");
    res.send(buffer);
  } catch (error) {
    console.error("Error getting preview:", error.message);
    res.status(500).json({
      message: "Server error while getting preview.",
      error: error.message,
    });
  }
};

exports.undo = (req, res) => {
  try {
    const historyState = CanvasService.undo();
    res.status(200).json({ message: "Undo successful.", ...historyState });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error during undo.", error: error.message });
  }
};

exports.redo = (req, res) => {
  try {
    const historyState = CanvasService.redo();
    res.status(200).json({ message: "Redo successful.", ...historyState });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error during redo.", error: error.message });
  }
};

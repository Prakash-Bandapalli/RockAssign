const { createCanvas, loadImage } = require("canvas");
const PDFDocument = require("pdfkit");

class CanvasService {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.history = [];
    this.historyIndex = -1;
  }

  // --- PRIVATE METHOD FOR SAVING STATE ---
  _saveState() {
    if (!this.ctx) return;
    // Clear any "redo" states if a new action is taken
    this.history = this.history.slice(0, this.historyIndex + 1);

    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.history.push(imageData);
    this.historyIndex++;
  }

  initialize(width, height) {
    this.canvas = createCanvas(width, height);
    this.ctx = this.canvas.getContext("2d");

    // Reset history
    this.history = [];
    this.historyIndex = -1;

    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(0, 0, width, height);

    console.log("CanvasService: Canvas created and context is ready.");
    // Save the initial blank state
    this._saveState();
  }

  async addElement(element, file) {
    if (!this.ctx) throw new Error("Canvas not initialized.");

    switch (element.type) {
      case "rectangle":
        this._drawRectangle(element);
        break;
      case "circle":
        this._drawCircle(element);
        break;
      case "text":
        this._drawText(element);
        break;
      case "image_url":
        await this._drawImageFromUrl(element);
        break;
      case "image_upload":
        await this._drawImageFromBuffer(element, file);
        break;
      default:
        console.warn(`Unsupported element type: ${element.type}`);
    }
    // Save state after every element is added
    this._saveState();
  }

  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      const imageData = this.history[this.historyIndex];
      this.ctx.putImageData(imageData, 0, 0);
      console.log(`CanvasService: Undone to state ${this.historyIndex}`);
    }
    return {
      canUndo: this.historyIndex > 0,
      canRedo: this.historyIndex < this.history.length - 1,
    };
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      const imageData = this.history[this.historyIndex];
      this.ctx.putImageData(imageData, 0, 0);
      console.log(`CanvasService: Redone to state ${this.historyIndex}`);
    }
    return {
      canUndo: this.historyIndex > 0,
      canRedo: this.historyIndex < this.history.length - 1,
    };
  }

  exportToPdf(options = {}) {
    // Default to highest quality if not specified in the options object
    const { quality = 1.0 } = options;

    return new Promise((resolve, reject) => {
      if (!this.canvas) {
        return reject(new Error("Canvas not initialized."));
      }

      const doc = new PDFDocument({
        size: [this.canvas.width, this.canvas.height],
      });

      let buffer;
      // If quality is 1 (or greater), use lossless PNG for max quality.
      // Otherwise, use compressed JPEG with the specified quality.
      if (quality >= 1.0) {
        buffer = this.canvas.toBuffer("image/png");
        console.log(
          "CanvasService: Canvas converted to lossless PNG for highest quality."
        );
      } else {
        buffer = this.canvas.toBuffer("image/jpeg", { quality });
        console.log(
          `CanvasService: Canvas converted to JPEG with ${
            quality * 100
          }% quality.`
        );
      }

      doc.image(buffer, 0, 0, {
        fit: [this.canvas.width, this.canvas.height],
        align: "center",
        valign: "center",
      });

      const buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        console.log("CanvasService: PDF generated successfully.");
        resolve(pdfData);
      });
      doc.on("error", reject);

      doc.end();
    });
  }

  getCanvasBuffer() {
    if (!this.canvas) {
      throw new Error("Canvas not initialized.");
    }
    // Always use PNG for preview for clarity, it's fast enough.
    return this.canvas.toBuffer("image/png");
  }

  _drawRectangle({ x, y, width, height, color }) {
    this.ctx.fillStyle = color || "#000000";
    this.ctx.fillRect(x, y, width, height);
    console.log(`CanvasService: Drew rectangle at (${x},${y})`);
  }

  _drawCircle({ cx, cy, radius, color }) {
    this.ctx.fillStyle = color || "#000000";
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    this.ctx.fill();
    console.log(`CanvasService: Drew circle at (${cx},${cy})`);
  }

  _drawText({ text, x, y, fontSize, fontFamily, color }) {
    this.ctx.fillStyle = color || "#000000";
    this.ctx.font = `${fontSize || 30}px ${fontFamily || "Arial"}`;
    this.ctx.fillText(text, x, y);
    console.log(`CanvasService: Drew text "${text}" at (${x},${y})`);
  }

  async _drawImageFromUrl({ url, x, y }) {
    try {
      const image = await loadImage(url);
      this.ctx.drawImage(image, x, y);
      console.log(`CanvasService: Drew image from URL at (${x},${y})`);
    } catch (error) {
      console.error(`Failed to load image from URL: ${url}`, error);
      throw new Error(`Could not load image from the provided URL.`);
    }
  }

  async _drawImageFromBuffer({ x, y }, file) {
    if (!file) {
      throw new Error("No file provided for image upload.");
    }
    try {
      const image = await loadImage(file.buffer);
      this.ctx.drawImage(image, parseInt(x, 10), parseInt(y, 10));
      console.log(
        `CanvasService: Drew uploaded image "${file.originalname}" at (${x},${y})`
      );
    } catch (error) {
      console.error(
        `Failed to load image from buffer: ${file.originalname}`,
        error
      );
      throw new Error("The uploaded file could not be processed as an image.");
    }
  }
}

const instance = new CanvasService();
module.exports = instance;

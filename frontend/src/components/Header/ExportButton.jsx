import { useState } from "react";
import * as api from "../../api/canvasApi";

function ExportButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [quality, setQuality] = useState("1.0");

  const handleExport = async () => {
    setIsLoading(true);
    const qualityValue = parseFloat(quality);
    const filename = `canvas-export-q${qualityValue * 100}.pdf`;

    try {
      const blob = await api.exportPdf(qualityValue);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to export PDF", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        value={quality}
        onChange={(e) => setQuality(e.target.value)}
        className="bg-gray-700 text-white rounded-md p-2 border border-gray-600 focus:ring-cyan-500 focus:border-cyan-500"
        title="Select Export Quality"
      >
        <option value="1.0">High Quality</option>
        <option value="0.95">Excellent</option>
        <option value="0.80">Good</option>
        <option value="0.60">Medium</option>
      </select>
      <button
        onClick={handleExport}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300 disabled:bg-gray-500"
      >
        {isLoading ? "Exporting..." : "Export PDF"}
      </button>
    </div>
  );
}

export default ExportButton;

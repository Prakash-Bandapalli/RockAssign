import { useState } from "react";

function ConfigPanel({ onInitialize, isInitialized }) {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await onInitialize(width, height);
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-cyan-300">
        1. Configure Canvas
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="width"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Width (px)
          </label>
          <input
            type="number"
            id="width"
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value, 10))}
            className="w-full bg-gray-700 text-white rounded-md p-2 border border-gray-600 focus:ring-cyan-500 focus:border-cyan-500"
            disabled={isInitialized || isLoading}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="height"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Height (px)
          </label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value, 10))}
            className="w-full bg-gray-700 text-white rounded-md p-2 border border-gray-600 focus:ring-cyan-500 focus:border-cyan-500"
            disabled={isInitialized || isLoading}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={isInitialized || isLoading}
        >
          {isInitialized
            ? "Canvas Initialized"
            : isLoading
            ? "Initializing..."
            : "Initialize Canvas"}
        </button>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default ConfigPanel;

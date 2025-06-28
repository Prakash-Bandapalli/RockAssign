import { useState } from "react";

function AddTextForm({ onAddElement }) {
  const [text, setText] = useState("Canvas!");
  const [x, setX] = useState(50);
  const [y, setY] = useState(100);
  const [fontSize, setFontSize] = useState(48);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [color, setColor] = useState("#000000");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("type", "text");
    formData.append("text", text);
    formData.append("x", x);
    formData.append("y", y);
    formData.append("fontSize", fontSize);
    formData.append("fontFamily", fontFamily);
    formData.append("color", color);

    try {
      await onAddElement(formData);
    } catch (err) {
      console.error(err);
      setError("Failed to add text.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="text-content"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Text
        </label>
        <input
          id="text-content"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-md p-2 border border-gray-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="text-x"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            X
          </label>
          <input
            id="text-x"
            type="number"
            value={x}
            onChange={(e) => setX(parseInt(e.target.value))}
            className="w-full bg-gray-700 text-white rounded-md p-2 border border-gray-600"
          />
        </div>
        <div>
          <label
            htmlFor="text-y"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Y
          </label>
          <input
            id="text-y"
            type="number"
            value={y}
            onChange={(e) => setY(parseInt(e.target.value))}
            className="w-full bg-gray-700 text-white rounded-md p-2 border border-gray-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="font-size"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Font Size
          </label>
          <input
            id="font-size"
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="w-full bg-gray-700 text-white rounded-md p-2 border border-gray-600"
          />
        </div>
        <div>
          <label
            htmlFor="font-family"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Font Family
          </label>
          <input
            id="font-family"
            type="text"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-md p-2 border border-gray-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Color
        </label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-10 p-1 bg-gray-700 rounded-md cursor-pointer"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:bg-gray-500"
      >
        {isLoading ? "Adding..." : "Add Text"}
      </button>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </form>
  );
}

export default AddTextForm;

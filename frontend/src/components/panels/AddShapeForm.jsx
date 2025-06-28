import { useState } from "react";

function AddShapeForm({ onAddElement }) {
  const [shapeType, setShapeType] = useState("rectangle");
  const [rect, setRect] = useState({ x: 50, y: 50, width: 200, height: 100 });
  const [circle, setCircle] = useState({ cx: 150, cy: 150, radius: 50 });
  const [color, setColor] = useState("#FF5733");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e, shapeSetter, shapeState) => {
    const { name, value } = e.target;
    shapeSetter({ ...shapeState, [name]: parseInt(value, 10) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("type", shapeType);
    formData.append("color", color);

    if (shapeType === "rectangle") {
      for (const key in rect) formData.append(key, rect[key]);
    } else {
      for (const key in circle) formData.append(key, circle[key]);
    }

    try {
      await onAddElement(formData);
    } catch (err) {
      console.error(err);
      setError(`Failed to add ${shapeType}.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="shape-type"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Shape Type
        </label>
        <select
          id="shape-type"
          value={shapeType}
          onChange={(e) => setShapeType(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-md p-2 border border-gray-600"
        >
          <option value="rectangle">Rectangle</option>
          <option value="circle">Circle</option>
        </select>
      </div>

      {shapeType === "rectangle" ? (
        <div id="rectangle-fields" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="rect-x"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                X
              </label>
              <input
                id="rect-x"
                name="x"
                value={rect.x}
                onChange={(e) => handleInputChange(e, setRect, rect)}
                type="number"
                className="w-full p-2 rounded-md bg-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="rect-y"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Y
              </label>
              <input
                id="rect-y"
                name="y"
                value={rect.y}
                onChange={(e) => handleInputChange(e, setRect, rect)}
                type="number"
                className="w-full p-2 rounded-md bg-gray-700"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="rect-width"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Width
              </label>
              <input
                id="rect-width"
                name="width"
                value={rect.width}
                onChange={(e) => handleInputChange(e, setRect, rect)}
                type="number"
                className="w-full p-2 rounded-md bg-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="rect-height"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Height
              </label>
              <input
                id="rect-height"
                name="height"
                value={rect.height}
                onChange={(e) => handleInputChange(e, setRect, rect)}
                type="number"
                className="w-full p-2 rounded-md bg-gray-700"
              />
            </div>
          </div>
        </div>
      ) : (
        <div id="circle-fields" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="circle-cx"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Center X
              </label>
              <input
                id="circle-cx"
                name="cx"
                value={circle.cx}
                onChange={(e) => handleInputChange(e, setCircle, circle)}
                type="number"
                className="w-full p-2 rounded-md bg-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="circle-cy"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Center Y
              </label>
              <input
                id="circle-cy"
                name="cy"
                value={circle.cy}
                onChange={(e) => handleInputChange(e, setCircle, circle)}
                type="number"
                className="w-full p-2 rounded-md bg-gray-700"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="circle-radius"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Radius
            </label>
            <input
              id="circle-radius"
              name="radius"
              value={circle.radius}
              onChange={(e) => handleInputChange(e, setCircle, circle)}
              type="number"
              className="w-full p-2 rounded-md bg-gray-700"
            />
          </div>
        </div>
      )}

      <div className="mt-4">
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
        className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:bg-gray-500"
      >
        {isLoading ? "Adding..." : "Add Shape"}
      </button>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </form>
  );
}

export default AddShapeForm;

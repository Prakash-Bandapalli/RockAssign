import { useState } from "react";
import AddShapeForm from "./AddShapeForm";
import AddTextForm from "./AddTextForm";
import AddImageForm from "./AddImageForm";

function AddElementPanel({ onAddElement }) {
  const [activeTab, setActiveTab] = useState("shapes");

  const renderTabContent = () => {
    switch (activeTab) {
      case "shapes":
        return <AddShapeForm onAddElement={onAddElement} />;
      case "text":
        return <AddTextForm onAddElement={onAddElement} />;
      case "image":
        return <AddImageForm onAddElement={onAddElement} />;
      default:
        return null;
    }
  };

  const getTabClass = (tabName) => {
    const isActive = activeTab === tabName;
    return `
      px-1 py-2 font-semibold border-b-2 transition-colors duration-200
      ${
        isActive
          ? "text-cyan-400 border-cyan-400"
          : "text-gray-400 border-transparent hover:border-gray-500 hover:text-gray-200"
      }
    `;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-cyan-300 my-1">
        2. Add Elements
      </h2>

      <div className="mt-4">
        <nav className="flex space-x-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("shapes")}
            className={getTabClass("shapes")}
          >
            Shapes
          </button>
          <button
            onClick={() => setActiveTab("text")}
            className={getTabClass("text")}
          >
            Text
          </button>
          <button
            onClick={() => setActiveTab("image")}
            className={getTabClass("image")}
          >
            Image
          </button>
        </nav>
      </div>

      <div className="pt-6">{renderTabContent()}</div>
    </div>
  );
}

export default AddElementPanel;

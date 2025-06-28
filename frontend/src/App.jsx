import { useState } from "react";
import ConfigPanel from "./components/panels/ConfigPanel";
import CanvasPreview from "./components/canvas/CanvasPreview";
import * as api from "./api/canvasApi";
import AddElementPanel from "./components/panels/AddElementPanel";
import HeaderActions from "./components/topheader/HeaderActions";
import ExportButton from "./components/topheader/ExportButton";

function App() {
  const [isCanvasInitialized, setIsCanvasInitialized] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const handleAddElement = async (formData) => {
    await api.addElement(formData);
    setCanUndo(true);
    setCanRedo(false);
    await refreshPreview();
  };

  const refreshPreview = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = await api.getPreviewUrl();
      if (previewUrl) URL.revokeObjectURL(previewUrl.split("#")[0]);
      setPreviewUrl(url);
    } catch (err) {
      console.error(err);
      setError("Could not load canvas preview.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInitialize = (width, height) => {
    setIsLoading(true);
    setError(null);
    api
      .initializeCanvas(width, height)
      .then(() => {
        setIsCanvasInitialized(true);
        setCanUndo(false);
        setCanRedo(false);
        return refreshPreview();
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to initialize canvas. Please try again.");
        setIsLoading(false);
      });
  };

  const handleUndo = async () => {
    try {
      const res = await api.undo();
      setCanUndo(res.data.canUndo);
      setCanRedo(res.data.canRedo);
      await refreshPreview();
    } catch (err) {
      console.error("Undo failed", err);
    }
  };

  const handleRedo = async () => {
    try {
      const res = await api.redo();
      setCanUndo(res.data.canUndo);
      setCanRedo(res.data.canRedo);
      await refreshPreview();
    } catch (err) {
      console.error("Redo failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="w-full flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/50 sticky top-0 z-20">
        <h1 className="text-2xl font-bold text-cyan-400">Canvas Builder</h1>

        <div
          className={`flex items-center space-x-6 transition-opacity duration-300 ${
            !isCanvasInitialized
              ? "opacity-30 pointer-events-none"
              : "opacity-100"
          }`}
        >
          <HeaderActions
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={canUndo}
            canRedo={canRedo}
          />
          <div className="h-8 w-px bg-gray-600"></div>
          <ExportButton />
        </div>
      </header>

      <main className="flex-grow w-full max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        <div className="md:col-span-1 xl:col-span-1 bg-gray-800 rounded-lg shadow-lg flex flex-col h-full max-h-[calc(100vh-120px)]">
          <div className="flex-grow p-6 overflow-y-auto space-y-8">
            <ConfigPanel
              onInitialize={handleInitialize}
              isInitialized={isCanvasInitialized}
            />

            <div
              className={`transition-opacity duration-500 ${
                !isCanvasInitialized
                  ? "opacity-30 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <hr className="border-gray-700" />
              <AddElementPanel onAddElement={handleAddElement} />
            </div>
          </div>
        </div>

        <div className="md:col-span-2 xl:col-span-3 bg-gray-800 rounded-lg shadow-lg flex items-center justify-center p-6 h-full max-h-[calc(100vh-120px)]">
          <CanvasPreview
            previewUrl={previewUrl}
            isLoading={isLoading}
            error={error}
            isInitialized={isCanvasInitialized}
          />
        </div>
      </main>
    </div>
  );
}

export default App;

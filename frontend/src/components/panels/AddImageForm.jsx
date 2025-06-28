import { useState } from "react";

function AddImageForm({ onAddElement }) {
  const [addMethod, setAddMethod] = useState("url");

  const [url, setUrl] = useState(
    "https://rocketium.com/img/rocketium-logo-black.png"
  );
  const [urlPos, setUrlPos] = useState({ x: 150, y: 90 });

  const [file, setFile] = useState(null);
  const [uploadPos, setUploadPos] = useState({ x: 40, y: 85 });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();

    if (addMethod === "url") {
      formData.append("type", "image_url");
      formData.append("url", url);
      formData.append("x", urlPos.x);
      formData.append("y", urlPos.y);
    } else {
      if (!file) {
        setError("Please select a file to upload.");
        setIsLoading(false);
        return;
      }
      formData.append("type", "image_upload");
      formData.append("image", file);
      formData.append("x", uploadPos.x);
      formData.append("y", uploadPos.y);
    }

    try {
      await onAddElement(formData);
    } catch (err) {
      console.error(err);
      setError("Failed to add image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex bg-gray-700 rounded-lg p-1">
        <button
          type="button"
          onClick={() => setAddMethod("url")}
          className={`w-1/2 p-2 rounded-md text-sm font-medium transition-colors ${
            addMethod === "url"
              ? "bg-cyan-600 text-white"
              : "text-gray-300 hover:bg-gray-600"
          }`}
        >
          From URL
        </button>
        <button
          type="button"
          onClick={() => setAddMethod("upload")}
          className={`w-1/2 p-2 rounded-md text-sm font-medium transition-colors ${
            addMethod === "upload"
              ? "bg-cyan-600 text-white"
              : "text-gray-300 hover:bg-gray-600"
          }`}
        >
          Upload File
        </button>
      </div>

      {addMethod === "url" ? (
        <div id="url-fields" className="space-y-4">
          <div>
            <label
              htmlFor="image-url"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Image URL
            </label>
            <input
              id="image-url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-md p-2 border border-gray-600"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="url-x"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                X
              </label>
              <input
                id="url-x"
                type="number"
                value={urlPos.x}
                onChange={(e) =>
                  setUrlPos({ ...urlPos, x: parseInt(e.target.value) })
                }
                className="w-full p-2 rounded-md bg-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="url-y"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Y
              </label>
              <input
                id="url-y"
                type="number"
                value={urlPos.y}
                onChange={(e) =>
                  setUrlPos({ ...urlPos, y: parseInt(e.target.value) })
                }
                className="w-full p-2 rounded-md bg-gray-700"
              />
            </div>
          </div>
        </div>
      ) : (
        <div id="upload-fields" className="space-y-4">
          <div>
            <label
              htmlFor="image-upload"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Select Image
            </label>
            <input
              id="image-upload"
              type="file"
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/svg+xml"
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="upload-x"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                X
              </label>
              <input
                id="upload-x"
                type="number"
                value={uploadPos.x}
                onChange={(e) =>
                  setUploadPos({ ...uploadPos, x: parseInt(e.target.value) })
                }
                className="w-full p-2 rounded-md bg-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="upload-y"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Y
              </label>
              <input
                id="upload-y"
                type="number"
                value={uploadPos.y}
                onChange={(e) =>
                  setUploadPos({ ...uploadPos, y: parseInt(e.target.value) })
                }
                className="w-full p-2 rounded-md bg-gray-700"
              />
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:bg-gray-500"
      >
        {isLoading ? "Adding..." : "Add Image"}
      </button>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </form>
  );
}

export default AddImageForm;

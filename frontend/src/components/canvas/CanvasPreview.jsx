function CanvasPreview({ previewUrl, isLoading, error, isInitialized }) {
  if (!isInitialized) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-700/50 rounded-md border-2 border-dashed border-gray-600">
        <p className="text-gray-400">Please initialize the canvas to begin.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-red-900/20 rounded-md border-2 border-dashed border-red-500">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (isLoading && !previewUrl) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
      )}
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Canvas Preview"
          className="max-w-full max-h-full object-contain rounded-md shadow-lg"
        />
      )}
    </div>
  );
}

export default CanvasPreview;

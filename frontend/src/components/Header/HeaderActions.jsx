function HeaderActions({ onUndo, onRedo, canUndo, canRedo }) {
  return (
    <div className="flex items-center space-x-2">
      <button
        title="Undo"
        onClick={onUndo}
        disabled={!canUndo}
        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-md transition duration-300 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
      >
        Undo
      </button>
      <button
        title="Redo"
        onClick={onRedo}
        disabled={!canRedo}
        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-md transition duration-300 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
      >
        Redo
      </button>
    </div>
  );
}

export default HeaderActions;

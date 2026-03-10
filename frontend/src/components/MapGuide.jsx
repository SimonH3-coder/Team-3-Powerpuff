// MapGuide - shows a simple side panel with map instructions

export default function MapGuide({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex" style={{ zIndex: 2000 }}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative ml-auto w-72 h-full bg-white shadow-lg p-6 flex flex-col gap-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy">Map Guide</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-xl font-bold">&times;</button>
        </div>

        <p className="text-sm text-gray-500">Here are some tips to use the map:</p>

        <div className="flex flex-col gap-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="font-semibold text-sm text-blue-800">Move around</p>
            <p className="text-sm text-gray-600 mt-1">Use the mouse wheel to zoom. Click and drag to move the map.</p>
          </div>

          <div className="bg-green-50 rounded-xl p-4">
            <p className="font-semibold text-sm text-green-800">Change layers</p>
            <p className="text-sm text-gray-600 mt-1">Click the layers button to switch between standard, satellite and terrain views.</p>
          </div>

          <div className="bg-purple-50 rounded-xl p-4">
            <p className="font-semibold text-sm text-purple-800">Post in the forum</p>
            <p className="text-sm text-gray-600 mt-1">Click on the map to create a forum post about that location (coming soon).</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Frame = () => null;

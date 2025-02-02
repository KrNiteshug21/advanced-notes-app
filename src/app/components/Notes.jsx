import { Clock, ImageIcon, MoreHorizontal, Pencil } from "lucide-react";
import React from "react";

const Notes = () => {
  return (
    <main className="flex-1 p-4 overflow-auto">
      <div className="gap-4 grid">
        {/* Note Card */}
        <div className="p-4 border rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="mb-1 text-gray-500 text-xs">
                Jan 30, 2025 • 5:26 PM
              </div>
              <h3 className="font-medium">Engineering Assignment Audio</h3>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500 text-xs">00:09</span>
            </div>
          </div>
          <p className="mb-3 text-gray-600 text-sm">
            I'm recording an audio to transcribe into text for the assignment of
            engineering in terms of actors.
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <ImageIcon className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500 text-xs">1 Image</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="hover:bg-gray-100 p-1 rounded">
                <Pencil className="w-4 h-4 text-gray-400" />
              </button>
              <button className="hover:bg-gray-100 p-1 rounded">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Second Note Card */}
        <div className="p-4 border rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="mb-1 text-gray-500 text-xs">
                Jan 30, 2025 • 5:21 PM
              </div>
              <h3 className="font-medium">Random Sequence</h3>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              Text
            </div>
          </div>
          <p className="text-gray-600 text-sm">ssxscscscsc</p>
        </div>
      </div>
    </main>
  );
};

export default Notes;

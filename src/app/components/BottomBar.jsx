import { Pencil, Image as ImageIcon } from "lucide-react";
import React from "react";

const BottomBar = () => {
  return (
    <div className="flex justify-between items-center px-4 border-t h-16">
      <div className="flex items-center gap-4">
        <button className="hover:bg-gray-100 p-2 rounded-lg">
          <Pencil className="w-5 h-5 text-gray-600" />
        </button>
        <button className="hover:bg-gray-100 p-2 rounded-lg">
          <ImageIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm text-white">
        start recording
      </button>
    </div>
  );
};

export default BottomBar;

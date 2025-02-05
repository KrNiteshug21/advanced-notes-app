import { Image as ImageIcon, MoreHorizontal, Pencil } from "lucide-react";
import React from "react";

const NoteSkeleton = () => {
  return (
    <div className="space-y-2 p-4 border rounded-lg">
      <div className="flex justify-between items-center">
        <div className="bg-gray-400 rounded-sm w-2/5 h-3 animate-pulse" />
        <div className="bg-gray-400 rounded-sm w-1/5 h-3 animate-pulse" />
      </div>
      <div className="bg-gray-400 rounded-sm w-1/4 h-8 animate-pulse" />
      <div className="bg-gray-400 rounded-sm w-full h-24 animate-pulse"></div>
      <div className="flex justify-between items-center">
        <div className="bg-gray-400 rounded-sm w-1/5 h-6 animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="bg-gray-400 rounded-sm w-6 h-6 animate-pulse" />
          <div className="bg-gray-400 rounded-sm w-6 h-6 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default NoteSkeleton;

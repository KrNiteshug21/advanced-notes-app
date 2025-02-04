"use client";

import {
  X,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  RotateCcw,
  RotateCw,
  List,
  Heading1,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { useState } from "react";

export function EditModal({
  isFullscreen,
  togfleFullscreen,
  isOpen,
  onClose,
  onSave,
  initialContent,
}) {
  const [content, setContent] = useState(initialContent);
  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50">
      <div
        className={`flex flex-col bg-white ${
          isFullscreen
            ? "fixed inset-0"
            : "w-full max-w-3xl h-[600px] rounded-lg"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            <button onClick={togfleFullscreen}>
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5 text-gray-400" />
              ) : (
                <Maximize2 className="w-5 h-5 text-gray-400" />
              )}
            </button>
            <h2 className="font-medium text-lg">Transcript</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-sm"
              onClick={() => onSave(content)}
            >
              Save
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" onClick={onClose} />
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 p-4">
          <textarea
            className="border-0 w-full h-full resize-none focus:outline-none text-gray-600"
            placeholder="It seems like the input you provided doesn't contain any meaningful text or transcript to format. If you have a specific transcript or text you'd like me to format, please provide that, and I'll be happy to help!"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 p-2 border-t">
          <button className="hover:bg-gray-100 p-2 rounded">
            <Bold className="w-4 h-4" />
          </button>
          <button className="hover:bg-gray-100 p-2 rounded">
            <Italic className="w-4 h-4" />
          </button>
          <button className="hover:bg-gray-100 p-2 rounded">
            <Underline className="w-4 h-4" />
          </button>
          <button className="hover:bg-gray-100 p-2 rounded">
            <Strikethrough className="w-4 h-4" />
          </button>
          <div className="bg-gray-200 mx-2 w-px h-5" />
          <button className="hover:bg-gray-100 p-2 rounded">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button className="hover:bg-gray-100 p-2 rounded">
            <RotateCw className="w-4 h-4" />
          </button>
          <div className="bg-gray-200 mx-2 w-px h-5" />
          <button className="hover:bg-gray-100 p-2 rounded">
            <List className="w-4 h-4" />
          </button>
          <button className="hover:bg-gray-100 p-2 rounded">
            <Heading1 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

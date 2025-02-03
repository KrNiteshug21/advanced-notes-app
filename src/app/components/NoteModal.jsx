"use client";

import { useState } from "react";
import {
  X,
  Maximize2,
  Star,
  Share2,
  Download,
  Copy,
  Plus,
  Minimize2,
} from "lucide-react";
import Image from "next/image";
import { EditModal } from "./EditModal";

export function NoteModal({ isOpen, onClose, note }) {
  const [activeTab, setActiveTab] = useState("transcript");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  if (!isOpen) return null;

  const handleSave = (content) => {
    // Handle saving the edited content
    setIsEditMode(false);
  };

  const togfleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <div className="z-20 fixed inset-0 flex justify-center items-center bg-black/50">
        <div
          className={`bg-white flex flex-col ${
            isFullscreen
              ? "fixed inset-0"
              : "w-full max-w-3xl h-[600px] rounded-lg"
          }`}
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-3">
              <button onClick={togfleFullscreen}>
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5 text-gray-400" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-gray-400 cursor-pointer" />
              <button className="flex items-center gap-2 hover:bg-gray-50 px-3 py-1.5 border rounded-lg text-sm">
                Share
                <Share2 className="w-4 h-4" />
              </button>
              <X
                className="w-5 h-5 text-gray-400 cursor-pointer"
                onClick={onClose}
              />
            </div>
          </div>

          {/* Note Title & Date */}
          <div className="p-4 border-b">
            <h2 className="flex items-center gap-2 font-semibold text-xl">
              {note.title}
              <button onClick={togfleFullscreen}>
                <Maximize2 className="w-4 h-4 text-gray-400" />
              </button>
            </h2>
            <p className="text-gray-500 text-sm">{note.date}</p>
          </div>

          {/* Audio Player */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-4">
              <button
                className="flex justify-center items-center bg-gray-100 rounded-full w-8 h-8"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <div className="bg-gray-600 rounded-sm w-3 h-3" />
                ) : (
                  <div className="border-y-4 border-y-transparent ml-1 border-l-8 border-l-gray-600 w-0 h-0" />
                )}
              </button>
              <div className="flex-1 bg-gray-200 rounded-full h-1">
                <div
                  className="relative bg-orange-500 rounded-full h-full"
                  style={{ width: `${progress}%` }}
                >
                  <div className="top-1/2 right-0 absolute bg-orange-500 rounded-full w-3 h-3 -translate-y-1/2" />
                </div>
              </div>
              <div className="text-gray-500 text-sm">{note.duration}</div>
              <button className="flex items-center gap-1 text-gray-600 text-sm">
                <Download className="w-4 h-4" />
                Download Audio
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 px-4 border-b">
            {["Notes", "Transcript", "Create", "Speaker Transcript"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`px-3 py-2 text-sm border-b-2 ${
                    activeTab === tab.toLowerCase()
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-600"
                  }`}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-4 overflow-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium">Transcript</h3>
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center gap-1 text-gray-600 text-sm"
                  onClick={() => setIsEditMode(true)}
                >
                  Edit
                </button>
                <button className="flex items-center gap-1 text-gray-600 text-sm">
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
            </div>
            <p className="mb-4 text-gray-600 text-sm">{note.transcript}</p>

            {/* Image Attachment */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/placeholder.svg"
                  alt="Attachment"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <button className="flex items-center gap-2 text-gray-600 text-sm">
                  <Plus className="w-4 h-4" />
                  Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditModal
        isFullscreen={isFullscreen}
        togfleFullscreen={togfleFullscreen}
        isOpen={isEditMode}
        onClose={() => setIsEditMode(false)}
        onSave={handleSave}
        initialContent={note.transcript}
      />
    </>
  );
}

"use client";
import {
  Clock,
  Image as ImageIcon,
  MoreHorizontal,
  Pencil,
} from "lucide-react";
import React, { useState } from "react";
import { NoteModal } from "./NoteModal";

const NoteCard = ({ note }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("isModalOpen", isModalOpen);
  const handleNoteClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className="hover:border-purple-500 p-4 border rounded-lg cursor-pointer"
        onClick={handleNoteClick}
      >
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

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        note={note}
      />
    </>
  );
};

export default NoteCard;

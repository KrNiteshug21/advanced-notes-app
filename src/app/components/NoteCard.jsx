"use client";
import {
  Clock,
  Image as ImageIcon,
  MoreHorizontal,
  Pencil,
  Type,
} from "lucide-react";
import React, { useState } from "react";
import { NoteModal } from "./NoteModal";
import { formatDate, formatTime } from "@/utils/util";

const NoteCard = ({ note }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              {formatDate(note.createdAt)}
            </div>
            <h3 className="font-medium">{note.title}</h3>
          </div>
          <div className="flex items-center gap-1 text-xs">
            {note.contentType === "audio" ? (
              <>
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500 text-xs">
                  {formatTime(parseInt(note.duration))}
                </span>
              </>
            ) : (
              <>
                <Type className="bg-black p-0.5 rounded-sm w-3.5 h-3.5 text-white" />
                <span className="font-semibold text-gray-500 text-xs tracking-wider">
                  Text
                </span>
              </>
            )}
          </div>
        </div>
        <p className="mb-3 text-gray-600 text-justify text-sm">
          {note.content}
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

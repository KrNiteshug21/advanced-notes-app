"use client";

import { useEffect, useState } from "react";
import {
  X,
  Maximize2,
  Star,
  Share2,
  Download,
  Copy,
  Minimize2,
  Pencil,
} from "lucide-react";
import Image from "next/image";
import { EditModal } from "./EditModal";
import { formatTime } from "@/utils/util";
import NoteTitle from "./NoteTitle";
import ImageUploader from "./ImageUploader";
import CopyToClipboard from "./CopyToClipboard";

const initModalObj = {
  header: "",
  msg: "",
  trigger: false,
  clickFunction: () => {},
};

export function NoteModal({ isOpen, onClose, note }) {
  const [activeTab, setActiveTab] = useState("transcript");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalObj, setModalObj] = useState(initModalObj);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorite = localStorage.getItem("favorite");
    if (favorite === null) return;
    const data = JSON.parse(favorite);
    const noteExist = data.some((n) => n.id === note._id);
    if (noteExist) setIsFavorite(true);
  }, []);

  if (!isOpen) return null;

  const handleUpdate = async ({ data, updateType }) => {
    const res = await fetch(`/api/note/${note._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, updateType }),
    });

    if (res.ok) {
      const updatedData = await res.json();
      console.log("updatedData", updatedData);
      setIsEditMode(false);
      setModalObj({
        header: "Success",
        msg: "Note has been updated successfully",
        trigger: true,
        clickFunction: () => {
          setModalObj(initModalObj);
          setIsEditMode(false);
          window.location.reload();
          // onClose();
        },
      });
    } else {
      setModalObj({
        header: "Error",
        msg: "Error updating note",
        trigger: true,
        clickFunction: () => {
          setModalObj(initModalObj);
        },
      });
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/note/${note._id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const data = await res.json();
      console.log("deleted", data);
      setModalObj({
        header: "Success",
        msg: "Note has been deleted successfully",
        trigger: true,
        clickFunction: () => {
          setModalObj(initModalObj);
          // onClose();
          window.location.reload();
        },
      });
    } else {
      setModalObj({
        header: "Error",
        msg: "Error deleting note",
        trigger: true,
        clickFunction: () => {
          setModalObj(initModalObj);
        },
      });
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleFavorite = () => {
    console.log("Favorite");
    const favorite = localStorage.getItem("favorite");
    const noteExist =
      favorite !== null && JSON.parse(favorite).some((n) => n.id === note._id);
    if (noteExist) return;
    if (!favorite) {
      localStorage.setItem("favorite", JSON.stringify([{ id: note._id }]));
    } else {
      const data = JSON.parse(favorite);
      data.push({ id: note._id });
      localStorage.setItem("favorite", JSON.stringify(data));
    }
    setIsFavorite(true);
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
              <button onClick={toggleFullscreen}>
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5 text-gray-400" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleFavorite}>
                <Star
                  fill={isFavorite ? "currentColor" : "none"}
                  className={`w-5 h-5 ${
                    isFavorite ? "text-orange-400" : "text-gray-400"
                  } cursor-pointer`}
                />
              </button>
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
          <NoteTitle
            noteTitle={note.title}
            createdAt={note.createdAt}
            handleUpdate={handleUpdate}
          />

          {/* Audio Player */}
          {note.contentType === "audio" && (
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
                <div className="text-gray-500 text-sm">
                  {formatTime(note.duration)}
                </div>
                <button className="flex items-center gap-1 text-gray-600 text-sm">
                  <Download className="w-4 h-4" />
                  Download Audio
                </button>
              </div>
            </div>
          )}
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
              <div className="flex items-center gap-1">
                <button
                  className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded-sm text-gray-600 text-sm"
                  onClick={() => setIsEditMode(true)}
                >
                  <Pencil className="w-3 h-3" />
                  Edit
                </button>
                <CopyToClipboard textToCopy={note.content} />
              </div>
            </div>
            <p className="mb-4 text-gray-600 text-sm">{note.content}</p>

            {/* Image Attachment */}
            {note.images.length > 0 && (
              <div className="mb-2 p-2 border rounded-lg h-44">
                <div className="flex items-center gap-2 h-full">
                  {note.images.map((image) => (
                    <Image
                      key={image}
                      src={image}
                      alt={image}
                      width={400}
                      height={300}
                      className="border-gray-200 border rounded-md w-48 h-full object-center object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <ImageUploader handleUpdate={handleUpdate} />
              <button
                onClick={handleDelete}
                className="bg-red-600 px-4 py-2 rounded-md text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditModal
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        isOpen={isEditMode}
        onClose={() => setIsEditMode(false)}
        onSave={handleUpdate}
        initialContent={note.content}
      />
    </>
  );
}

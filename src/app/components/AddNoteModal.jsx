"use client";

import { useState } from "react";
import { X } from "lucide-react";
import AudioRecorder from "./AudioRecorder";
import SuccessModal from "./SuccessModal";

const initModalObj = {
  header: "",
  msg: "",
  trigger: false,
  clickFunction: () => {},
};

export function AddNoteModal({ isOpen, onClose, activeTab, setActiveTab }) {
  // const [activeTab, setActiveTab] = useState("text");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [modalObj, setModalObj] = useState({});

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("No transcript available.");
      return;
    }
    let noteData = { title, content, contentType: activeTab, images: [] };
    if (activeTab === "audio") noteData.duration = elapsedTime.toString();
    console.log(noteData);

    const res = await fetch("/api/note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noteData),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("notedata", data);
      setModalObj({
        header: "Note Created",
        msg: "Note created successfully!",
        trigger: true,
        clickFunction: () => {
          setModalObj(initModalObj);
          setTitle("");
          setContent("");
          setElapsedTime(0);
          setIsRecording(false);
          onClose();
          window.location.reload();
        },
      });
    } else {
      setModalObj({
        header: "Note Creation Failed",
        msg: "Failed to create note.",
        trigger: true,
        clickFunction: () => setModalObj(initModalObj),
      });
    }
  };

  return (
    <>
      <SuccessModal modalObj={modalObj} />
      <div className="z-20 fixed inset-0 flex justify-center items-center bg-black/50">
        <div className="bg-white rounded-lg w-full max-w-2xl">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-medium text-lg">Add New Note</h2>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === "text"
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("text")}
            >
              Text Note
            </button>
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === "audio"
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("audio")}
            >
              Voice Note
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4">
            {/* Title Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="focus:border-purple-500 px-3 py-2 border rounded-lg w-full focus:outline-none"
                required
              />
            </div>

            {activeTab === "text" ? (
              /* Text Note Content */
              <div className="mb-4">
                <textarea
                  placeholder="Start typing..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="focus:border-purple-500 px-3 py-2 border rounded-lg w-full h-48 resize-none focus:outline-none"
                  required
                />
              </div>
            ) : (
              /* Voice Note Recording */
              <AudioRecorder
                isRecording={isRecording}
                setIsRecording={setIsRecording}
                elapsedTime={elapsedTime}
                setElapsedTime={setElapsedTime}
                content={content}
                setContent={setContent}
              />
            )}

            {/* Footer */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="hover:bg-gray-100 px-4 py-2 rounded-lg text-gray-600 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm text-white"
              >
                Save Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

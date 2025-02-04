"use client";
import { Pencil, Image as ImageIcon } from "lucide-react";
import React, { useState } from "react";
import { AddNoteModal } from "./AddNoteModal";

const BottomBar = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleModalToggle = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <>
      <div className="bottom-4 sticky bg-white mx-auto w-full max-w-screen-sm">
        <div className="flex justify-between items-center border-gray-400 p-2 border rounded-full">
          <div className="flex items-center gap-4">
            <button
              onClick={handleModalToggle}
              className="hover:bg-gray-100 p-2 rounded-lg"
            >
              <Pencil className="w-5 h-5 text-gray-600" />
            </button>
            <button className="hover:bg-gray-100 p-2 rounded-lg">
              <ImageIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-sm text-white">
            start recording
          </button>
        </div>
      </div>
      <AddNoteModal isOpen={openModal} onClose={handleModalToggle} />
    </>
  );
};

export default BottomBar;

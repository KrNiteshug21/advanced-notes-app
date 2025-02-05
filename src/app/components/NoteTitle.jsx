import { Pencil } from "lucide-react";
import { useState } from "react";
import { formatDate } from "@/utils/util";

const NoteTitle = ({ noteTitle, createdAt, handleUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <>
      {!isEditing ? (
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="space-x-2 font-semibold text-xl">
            <span>{noteTitle}</span>
            <button onClick={() => setIsEditing(true)}>
              <Pencil className="w-4 h-4" />
            </button>
          </h2>
          <p className="text-gray-500 text-sm">{formatDate(createdAt)}</p>
        </div>
      ) : (
        <form className="flex items-center gap-4 p-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            className="border-gray-300 px-1.5 py-1 border rounded w-full text-sm outline-none"
          />
          <button
            className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded text-sm"
            type="button"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleUpdate({ data: title, updateType: "title" });
              setTitle("");
              setIsEditing(false);
            }}
            className="bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded text-sm text-white"
            type="submit"
          >
            Save
          </button>
        </form>
      )}
    </>
  );
};

export default NoteTitle;

"use client";
import { useEffect, useState } from "react";
import NoteCard from "./NoteCard";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("/api/note")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  return (
    <main className="flex-1 p-4 w-full overflow-auto">
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {/* Note Card */}
        {notes.map((note) => (
          <NoteCard note={note} key={note._id} />
        ))}
      </div>
    </main>
  );
};

export default Notes;

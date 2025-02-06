import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import NoteSkeleton from "./NoteSkeleton";

const Favorites = ({ notes }) => {
  const [loading, setLoading] = useState(true);
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    const favourite = localStorage.getItem("favorite");
    if (favourite === null) {
      setLoading(false);
      return;
    }
    const favouriteNotes = notes.filter((note) => favourite.includes(note._id));
    setFilteredNotes(favouriteNotes);
    setLoading(false);
  }, []);

  return (
    <main className="flex-1 p-4 w-full overflow-auto">
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((note) => <NoteSkeleton key={note} />)
        ) : filteredNotes.length > 0 ? (
          filteredNotes.map((note) => <NoteCard note={note} key={note._id} />)
        ) : (
          <div className="w-full text-gray-500 text-left">
            No favourite notes found
          </div>
        )}
      </div>
    </main>
  );
};

export default Favorites;

"use client";
import NoteCard from "./NoteCard";
import NoteSkeleton from "./NoteSkeleton";

const Notes = ({ notes, loading }) => {
  return (
    <main className="flex-1 p-4 w-full overflow-auto">
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {/* Note Card */}
        {loading
          ? [1, 2, 3, 4, 5, 6].map((note) => <NoteSkeleton key={note} />)
          : notes.map((note) => <NoteCard note={note} key={note._id} />)}
      </div>
    </main>
  );
};

export default Notes;

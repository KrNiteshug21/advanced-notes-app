import NoteCard from "./NoteCard";

const Notes = () => {
  const sampleNote = {
    title: "Engineering Assignment Audio",
    date: "30 January 2025 • 05:26 PM",
    transcript:
      "I'm recording an audio to transcribe into text for the assignment of engineering in terms of actors.",
    audioUrl: "#",
    duration: "00:00 / 00:09",
  };

  return (
    <main className="flex-1 p-4 w-full overflow-auto">
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {/* Note Card */}
        {[...Array(6)].map((_, index) => (
          <NoteCard note={sampleNote} key={index} />
        ))}
      </div>
    </main>
  );
};

export default Notes;

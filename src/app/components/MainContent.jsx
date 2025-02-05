"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Notes from "./Notes";
import BottomBar from "./BottomBar";

const MainContent = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch("/api/note");
      const data = await res.json();
      setNotes(data);
      setLoading(false);
    };

    fetchNotes();
  }, []);

  return (
    <div className="relative flex flex-col flex-1 ml-64">
      <Header search={search} setSearch={setSearch} />
      <Notes notes={filteredNotes} loading={loading} />
      <BottomBar />
    </div>
  );
};

export default MainContent;

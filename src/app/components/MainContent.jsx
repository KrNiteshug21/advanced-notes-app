"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Notes from "./Notes";
import BottomBar from "./BottomBar";
import Favorites from "./Favorites";

const MainContent = ({ activeTab }) => {
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
    <>
      <>
        <Header search={search} setSearch={setSearch} />
        {activeTab === "home" ? (
          <Notes notes={filteredNotes} loading={loading} />
        ) : (
          <Favorites notes={filteredNotes} />
        )}
        <BottomBar />
      </>
    </>
  );
};

export default MainContent;

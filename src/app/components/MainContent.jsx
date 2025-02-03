import React from "react";
import Header from "./Header";
import Notes from "./Notes";
import BottomBar from "./BottomBar";

const MainContent = () => {
  return (
    <div className="relative flex flex-col flex-1 ml-64">
      <Header />
      <Notes />
      <BottomBar />
    </div>
  );
};

export default MainContent;

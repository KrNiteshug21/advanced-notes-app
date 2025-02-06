"use client";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { useState } from "react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");
  const handleTabChange = (tab) => setActiveTab(tab);

  return (
    <div className="flex h-screen text-slate-700 bg-white relative">
      <Sidebar activeTab={activeTab} handleTabChange={handleTabChange} />

      <div className="relative flex flex-col flex-1 ml-64 ">
        <MainContent activeTab={activeTab} />
      </div>
    </div>
  );
}

import { Search } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-4 border-b h-16">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
          <input
            type="search"
            placeholder="Search"
            className="focus:border-purple-500 py-2 pr-4 pl-10 border rounded-lg w-full text-sm focus:outline-none"
          />
        </div>
      </div>
      <button className="flex items-center gap-2 hover:bg-gray-50 px-3 py-1.5 border rounded-lg text-sm">
        <span>Sort</span>
      </button>
    </header>
  );
};

export default Header;

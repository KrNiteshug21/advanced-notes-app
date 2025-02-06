import { Home, Star } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AuthStatus from "./AuthStatus";

const Sidebar = ({ activeTab, handleTabChange }) => {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("token");
  const [cookieValue, setCookieValue] = useState("");
  console.log(cookieValue);

  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("myCookie="))
      ?.split("=")[1];
    setCookieValue(cookies || "Not Found");
  }, []);

  return (
    <div className="top-0 left-0 fixed w-64 h-full">
      <div className="flex flex-col gap-4 m-4 border rounded-2xl h-[96vh]">
        <div className="flex items-center gap-2 p-2 border-b">
          <div className="flex justify-center items-center bg-purple-600 rounded-lg w-8 h-8">
            <span className="font-semibold text-white">AI</span>
          </div>
          <span className="font-semibold text-purple-700 tracking-wider">
            AI Notes
          </span>
        </div>

        <nav className="flex-1 px-2">
          <button
            onClick={() => handleTabChange("home")}
            className={`flex items-center gap-3 ${
              activeTab === "home"
                ? "text-purple-600 bg-purple-50"
                : "text-gray-600 hover:bg-gray-100"
            }  mb-1 px-3 py-2 rounded-lg w-full text-sm`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
          <button
            onClick={() => handleTabChange("favorites")}
            className={`flex items-center gap-3 px-3 ${
              activeTab === "favorites"
                ? "text-purple-600 bg-purple-50"
                : "text-gray-600 hover:bg-gray-100"
            }  py-2 rounded-lg w-full text-sm`}
          >
            <Star className="w-4 h-4" />
            <span>Favourites</span>
          </button>
        </nav>

        {/* <AuthStatus token={token} /> */}
      </div>
    </div>
  );
};

export default Sidebar;

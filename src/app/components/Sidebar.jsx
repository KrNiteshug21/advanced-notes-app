import { Home, Star } from "lucide-react";
import Link from "next/link";
import React from "react";
import AuthStatus from "./AuthStatus";
import { cookies } from "next/headers";

const Sidebar = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

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
          <Link
            href="#"
            className="flex items-center gap-3 bg-purple-50 mb-1 px-3 py-2 rounded-lg text-purple-600 text-sm"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg text-gray-600 text-sm"
          >
            <Star className="w-4 h-4" />
            <span>Favourites</span>
          </Link>
        </nav>

        <AuthStatus token={token} />
      </div>
    </div>
  );
};

export default Sidebar;

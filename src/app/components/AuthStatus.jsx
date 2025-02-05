"use client";
import { User } from "lucide-react";
import Link from "next/link";

const AuthStatus = ({ token }) => {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload();
  };

  return (
    <div className="relative px-4 py-2 border-t">
      <div className="flex items-center gap-2">
        <User className="bg-black/70 rounded-sm w-5 h-5 text-white" />
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default AuthStatus;

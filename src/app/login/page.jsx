"use client";
import Link from "next/link";
import { Mail, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import SuccessModal from "../components/SuccessModal";

const initialState = {
  email: "",
  password: "",
};

const initModal = {
  trigger: false,
  header: "",
  msg: "",
  clickFunction: () => {},
};

export default function LoginPage() {
  const [user, setUser] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [modalObj, setModalObj] = useState(initModal);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log(data);
    if (data?.success) {
      // Redirect to home page
      setUser(initialState);
      setModalObj({
        trigger: true,
        header: "Success",
        msg: "Login successful",
        clickFunction: () => {
          setModalObj(initModal);
          window.location.href = "/";
        },
      });
    } else {
      setModalObj({
        trigger: true,
        header: "Error",
        msg: data.error,
        clickFunction: () => {
          setModalObj(initModal);
        },
      });
    }
  };

  return (
    <>
      <SuccessModal modalObj={modalObj} />
      <div className="flex flex-col justify-center items-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="flex flex-col justify-center items-center text-center">
            <div className="flex justify-center items-center bg-purple-600 mb-4 rounded-xl w-12 h-12">
              <span className="font-bold text-white text-xl">AI</span>
            </div>
            <h2 className="font-bold text-3xl text-gray-900">Welcome back</h2>
            <p className="mt-2 text-gray-600 text-sm">
              Please enter your details to sign in
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6 mt-8">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block font-medium text-gray-700 text-sm"
                >
                  Email
                </label>
                <div className="relative mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block border-gray-300 px-4 py-3 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-purple-500 w-full appearance-none placeholder-gray-400 focus:outline-none"
                    placeholder="Enter your email"
                    value={user.email}
                    onChange={handleChange}
                  />
                  <div className="right-0 absolute inset-y-0 flex items-center pr-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block font-medium text-gray-700 text-sm"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="block border-gray-300 px-4 py-3 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-purple-500 w-full appearance-none placeholder-gray-400 focus:outline-none"
                    placeholder="••••••••"
                    value={user.password}
                    onChange={handleChange}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="right-0 absolute inset-y-0 flex items-center pr-3 text-gray-400"
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleSubmit}
                type="submit"
                className="group relative flex justify-center bg-purple-600 hover:bg-purple-700 px-4 py-3 border border-transparent rounded-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full font-medium text-sm text-white focus:outline-none"
              >
                Sign in
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

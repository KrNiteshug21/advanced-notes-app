"use client";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const initModal = {
  trigger: false,
  header: "",
  msg: "",
  clickFunction: () => {},
};

export default function RegisterPage() {
  const [user, setUser] = useState(initialState);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdStatus, setPwdStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  cosnt[(modalObj, setModalObj)] = useState(initModal);

  useEffect(() => {
    if (user.password === "" || confirmPassword === "") {
      setPwdStatus("notStarted");
    } else if (user.password === confirmPassword) {
      console.log("Passwords match");
      setPwdStatus("match");
    } else {
      console.log("Passwords do not match");
      setPwdStatus("mismatch");
    }
  }, [confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log(data);
    if (data.hasOwnProperty("_id")) {
      // Redirect to home page
      setModalObj({
        trigger: true,
        header: "Success",
        msg: "Account created successfully",
        clickFunction: () => {
          setModalObj(initModal);
          window.location.href = "/login";
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

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="flex flex-col justify-center items-center text-center">
          <div className="flex justify-center items-center bg-purple-600 mb-4 rounded-xl w-12 h-12">
            <span className="font-bold text-white text-xl">AI</span>
          </div>
          <h2 className="font-bold text-3xl text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-gray-600 text-sm">
            Sign up to get started with AI Notes
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6 mt-8">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block font-medium text-gray-700 text-sm"
              >
                Full Name
              </label>
              <div className="relative mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block border-gray-300 px-4 py-3 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-purple-500 w-full appearance-none placeholder-gray-400 focus:outline-none"
                  placeholder="Enter your full name"
                  value={user.name}
                  onChange={handleChange}
                />
                <div className="right-0 absolute inset-y-0 flex items-center pr-3">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

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
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block border-gray-300 px-4 py-3 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-purple-500 w-full appearance-none placeholder-gray-400 focus:outline-none"
                  placeholder="Create a password"
                  value={user.password}
                  onChange={handleChange}
                />
                <div className="right-0 absolute inset-y-0 flex items-center pr-3 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
              </div>
              <p className="mt-1 text-gray-500 text-xs">
                Must be at least 8 characters long
              </p>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block font-medium text-gray-700 text-sm"
              >
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="block border-gray-300 px-4 py-3 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-purple-500 w-full appearance-none placeholder-gray-400 focus:outline-none"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div
                  onClick={handlePasswordVisibility}
                  className="right-0 absolute inset-y-0 flex items-center pr-3 text-gray-400"
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </div>

                <p
                  className={`mt-1 ${
                    pwdStatus == "match" ? "text-green-500" : "text-red-600"
                  } text-xs`}
                >
                  {pwdStatus === "notStarted" && " "}
                  {pwdStatus === "match" && "Passwords match"}
                  {pwdStatus === "mismatch" && "Passwords do not match"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="border-gray-300 rounded focus:ring-purple-500 w-4 h-4 text-purple-600"
            />
            <label htmlFor="terms" className="block ml-2 text-gray-700 text-sm">
              I agree to the{" "}
              <Link
                href="#"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleSubmit}
              type="submit"
              className="group relative flex justify-center bg-purple-600 hover:bg-purple-700 px-4 py-3 border border-transparent rounded-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full font-medium text-sm text-white focus:outline-none"
            >
              Create account
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

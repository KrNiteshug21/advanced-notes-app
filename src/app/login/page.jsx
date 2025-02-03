import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
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
                  autoComplete="current-password"
                  required
                  className="block border-gray-300 px-4 py-3 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-purple-500 w-full appearance-none placeholder-gray-400 focus:outline-none"
                  placeholder="••••••••"
                />
                <div className="right-0 absolute inset-y-0 flex items-center pr-3">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="border-gray-300 rounded focus:ring-purple-500 w-4 h-4 text-purple-600"
              />
              <label
                htmlFor="remember-me"
                className="block ml-2 text-gray-700 text-sm"
              >
                Remember me
              </label>
            </div>

            <Link
              href="/forgot-password"
              className="font-medium text-purple-600 text-sm hover:text-purple-500"
            >
              Forgot password?
            </Link>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              className="group relative flex justify-center bg-purple-600 hover:bg-purple-700 px-4 py-3 border border-transparent rounded-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full font-medium text-sm text-white focus:outline-none"
            >
              Sign in
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>

            <button
              type="button"
              className="flex justify-center items-center gap-2 border-gray-300 hover:bg-gray-50 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full font-medium text-gray-700 text-sm focus:outline-none"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
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
  );
}

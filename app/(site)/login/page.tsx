"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

export default function Page() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
       await signIn("credentials", {
        ...formData,
        redirect: false,
        callbackUrl: "/register",
      }).then((res) => {
        if (res?.ok) {
         console.log("Ok.");
        }   else {  
            setError("Invalid email or password");
      }});
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-600 via-sky-500 to-cyan-400 p-4 relative">
      {/* Background Animation - floating cloud */}
      <motion.div
        initial={{ x: -20 }}
        animate={{ x: 20 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 6 }}
        className="absolute top-16 right-12 w-28 h-16 bg-gray-200 rounded-full shadow-md opacity-70"
      />

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-sky-700">
          🔐 Login to Weather App
        </h2>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-sky-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 rounded-xl border border-sky-300 focus:ring-2 focus:ring-sky-400 outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-sky-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 rounded-xl border border-sky-300 focus:ring-2 focus:ring-sky-400 outline-none"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

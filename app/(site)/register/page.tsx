"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    neighbourCities: [""],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (name === "neighbourCities" && index !== undefined) {
      const updated = [...formData.neighbourCities];
      updated[index] = value;
      setFormData({ ...formData, neighbourCities: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addNeighbourCity = () => {
    setFormData({
      ...formData,
      neighbourCities: [...formData.neighbourCities, ""],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.message || "Registration failed"}`);
      } else {
        setMessage("✅ Registration successful! Please log in.");
        setFormData({
          name: "",
          email: "",
          password: "",
          city: "",
          neighbourCities: [""],
        });
      }
    } catch (error) {
      console.error("Register error:", error);
      setMessage("⚠️ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-500 via-sky-400 to-cyan-300 p-4 relative overflow-hidden">
      {/* Glowing Sun */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-24 h-24 rounded-full shadow-[0_0_40px_15px_rgba(255,215,0,0.5)] bg-gradient-to-tr from-yellow-300 via-yellow-400 to-orange-300"
      />

      {/* Dark Irregular Cloud */}
      <motion.div
        initial={{ x: -20 }}
        animate={{ x: 20 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-28 right-10 flex space-x-[-20px] opacity-80"
      >
        <div className="w-20 h-20 bg-gray-600 rounded-full shadow-lg"></div>
        <div className="w-24 h-16 bg-gray-500 rounded-full shadow-lg"></div>
        <div className="w-16 h-16 bg-gray-700 rounded-full shadow-lg"></div>
      </motion.div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6 z-10"
      >
        <h2 className="text-2xl font-bold text-center text-sky-700">
          🌤️ Weather App Registration
        </h2>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-sky-600">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 rounded-xl border border-sky-300 focus:ring-2 focus:ring-sky-400 outline-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-sky-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 rounded-xl border border-sky-300 focus:ring-2 focus:ring-sky-400 outline-none"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-sky-600">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 rounded-xl border border-sky-300 focus:ring-2 focus:ring-sky-400 outline-none"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-sky-600">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 rounded-xl border border-sky-300 focus:ring-2 focus:ring-sky-400 outline-none"
            required
          />
        </div>

        {/* Neighbour Cities */}
        <div>
          <label className="block text-sm font-medium text-sky-600">
            Neighbour Cities
          </label>
          {formData.neighbourCities.map((city, index) => (
            <input
              key={index}
              type="text"
              name="neighbourCities"
              value={city}
              onChange={(e) => handleChange(e, index)}
              className="mt-1 w-full px-4 py-2 mb-2 rounded-xl border border-sky-300 focus:ring-2 focus:ring-sky-400 outline-none"
            />
          ))}
          <button
            type="button"
            onClick={addNeighbourCity}
            className="text-sm text-sky-600 hover:underline"
          >
            + Add another city
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Message */}
        {message && (
          <p className="text-center mt-4 font-medium text-sky-700">{message}</p>
        )}
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import heroBg from "../assets/hero_background.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Send signup request to backend
      const res = await axios.post("http://localhost:3000/users/signup", { name, email });
      const userId = res.data.id;
      // Store userId in localStorage
      localStorage.setItem("userId", userId);
      // Redirect to home page
      window.location.href = "/";
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: Form */}
      <div className="flex flex-col justify-center w-full max-w-md px-8 bg-[#0b1a33] text-white">
        <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded bg-[#1f2d45] placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-[#1f2d45] placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="you@example.com"
            />
          </div>
          {error && <div className="text-red-400">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 rounded hover:bg-orange-600 transition"
          >
            Sign Up
          </button>
        </form>
      </div>

      {/* Right: Hero background with dark overlay */}
      <div
        className="hidden md:flex flex-1 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 m-auto p-12 max-w-lg text-white">
          <h1 className="text-4xl font-extrabold mb-4">Join Us Today!</h1>
          <p className="text-lg">
            Sign up with your name and email to start exploring our exclusive film collection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
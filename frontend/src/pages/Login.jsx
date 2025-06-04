import React, { useState } from "react";
import heroBg from "../assets/hero_background.png";


const Login = () => {
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with email:", email);
    // Add your login logic here
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: Form */}
      <div className="flex flex-col justify-center w-full max-w-md px-8 bg-[#0b1a33] text-white">
        <h2 className="text-3xl font-bold mb-6">Log In</h2>
        <form onSubmit={handleLogin} className="space-y-6">
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
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 rounded hover:bg-orange-600 transition"
          >
            Log In
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
          <h1 className="text-4xl font-extrabold mb-4">Welcome Back!</h1>
          <p className="text-lg">
            Enter your email to continue watching your favorite films and discover new ones.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
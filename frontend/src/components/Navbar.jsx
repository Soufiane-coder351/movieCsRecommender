import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem("userId");

  return (
    <nav className="bg-[#0c1e3a] p-4 text-white text-xl font-bold w-full sticky top-0 z-20">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2 hover:text-orange-400 transition">
          <span role="img" aria-label="logo">🎬</span>
          Movie Explorer
        </Link>
        {isLoggedIn ? (
          <Link
            to="/profile"
            className="px-5 py-2 rounded-lg font-semibold bg-[#1f2d45] text-white border border-[#223355] shadow-sm hover:bg-orange-500 hover:text-white transition-all duration-200"
          >
            Profile
          </Link>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-5 py-2 rounded-lg font-semibold bg-[#1f2d45] text-white border border-[#223355] shadow-sm hover:bg-orange-500 hover:text-white transition-all duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 rounded-lg font-semibold bg-[#1f2d45] text-white border border-[#223355] shadow-sm hover:bg-orange-500 hover:text-white transition-all duration-200"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
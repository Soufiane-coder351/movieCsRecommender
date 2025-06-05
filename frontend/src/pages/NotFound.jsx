import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0b1a33] to-[#08111c] text-white px-4">
      <h1 className="text-9xl font-extrabold mb-6 select-none">404</h1>
      <p className="text-2xl mb-4">Oops! The page you’re looking for doesn’t exist.</p>
      <p className="mb-8 max-w-md text-center text-gray-300">
        Maybe try going back home and exploring some movies instead?
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 transition font-semibold"
      >
        Go Home 🎬
      </Link>
      {/* Optional cute emoji or image */}
      <div className="mt-12 text-6xl animate-bounce select-none" role="img" aria-label="Sad movie face">
        🎥😢
      </div>
    </div>
  );
};

export default NotFound;

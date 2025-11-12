import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50"> 
      <h1 className="text-3xl font-bold text-blue-700 tracking-wide hover:text-blue-800 transition duration-200">
        JustiFind
      </h1>
      <nav className="space-x-6">
        <Link
          to="/"
          className="text-gray-700 font-medium hover:text-blue-600 transition duration-200"
        >
          Home
        </Link>
        <Link
          to="/laws"
          className="text-gray-700 font-medium hover:text-blue-600 transition duration-200"
        >
          Laws by Category
        </Link>
        <Link
          to="/ngos"
          className="text-gray-700 font-medium hover:text-blue-600 transition duration-200"
        >
          NGOs & Legal Aid
        </Link>
        <Link
          to="/news"
          className="text-gray-700 font-medium hover:text-blue-600 transition duration-200"
        >
          News
        </Link>
        <Link
          to="/myths"
          className="text-gray-700 font-medium hover:text-blue-600 transition duration-200"
        >
          Myths vs Facts
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;

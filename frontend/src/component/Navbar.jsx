import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for login/logout updates
    const updateEmail = () => {
      setEmail(localStorage.getItem("email"));
    };

    window.addEventListener("storageChange", updateEmail);

    return () => {
      window.removeEventListener("storageChange", updateEmail);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("token");

    setEmail("");

    // Notify components
    window.dispatchEvent(new Event("storageChange"));

    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-blue-700">JustiFind</h1>

      <nav className="flex items-center space-x-6">
        <Link to="/">Home</Link>
        <Link to="/laws">Laws by Category</Link>
        <Link to="/ngos">NGOs & Legal Aid</Link>
        <Link to="/news">News</Link>
        <Link to="/myths">Myths vs Facts</Link>

        {email ? (
          <>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              {email}
            </span>
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600 font-medium ml-4"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

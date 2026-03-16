import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = async () => {
  setLoading(true);

  // 👉 USER DOES NOT NEED LOCATION
  if (role === "user") {
    try {
      const url = `http://localhost:8080/register/${role}`;
      const res = await axios.post(url, form);
      alert(res.data);
    } catch (err) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
    return;
  }

  // 👉 LAWYER / NGO NEED LOCATION
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const longitude = pos.coords.longitude;
      const latitude = pos.coords.latitude;

      const finalData = {
        ...form,
        longitude,
        latitude,
      };

      try {
        const url = `http://localhost:8080/register/${role}`;
        const res = await axios.post(url, finalData);
        alert(res.data);
      } catch (err) {
        alert("Registration failed");
      } finally {
        setLoading(false);
      }
    },
    () => {
      alert("Please allow location access to register.");
      setLoading(false);
    }
  );
};


  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-[380px] bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Register
        </h2>

        {/* ROLE SELECTOR */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        >
          <option value="user">User</option>
          <option value="lawyer">Lawyer</option>
          <option value="ngo">NGO</option>
        </select>

        {/* COMMON */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-3"
        />

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-3"
        />

        {/* LAWYER */}
        {role === "lawyer" && (
          <>
            <input
              type="text"
              name="Category"
              placeholder="Category"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-3"
            />
            <input
              type="text"
              name="City"
              placeholder="City"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-3"
            />
            <input
              type="number"
              name="contact"
              placeholder="Contact Number"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-3"
            />
          </>
        )}

        {/* NGO */}
        {role === "ngo" && (
          <>
            <input
              type="long"
              name="contact"
              placeholder="Contact Number"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-3"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-3"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-3"
            />
          </>
        )}

        <button
          onClick={registerUser}
          className="w-full p-2 bg-blue-600 text-white rounded-lg mt-3 hover:bg-blue-700"
        >
          {loading ? "Please wait..." : "Register"}
        </button>
      </div>
    </div>
  );
}

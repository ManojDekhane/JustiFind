import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
  try {
    const res = await axios.post("http://localhost:8080/login", {
      email: form.email,
      password: form.password,
      role: role,
    });

    const response = res.data;

    if (response.startsWith("ERROR")) {
      alert(response.replace("ERROR:", ""));
      return;
    }

    // SUCCESS
    const token = response.replace("SUCCESS:", "");

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("email", form.email);
    localStorage.setItem("role", role);

    window.dispatchEvent(new Event("storageChange"));

    alert("Login successful");
    navigate("/");

  } catch (err) {
    alert("Server error");
  }
};


  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-[380px] bg-white p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Login
        </h2>

        <select
          onChange={(e) => setRole(e.target.value)}
          value={role}
          className="w-full p-2 border rounded-lg mb-4"
        >
          <option value="user">User</option>
          <option value="lawyer">Lawyer</option>
          <option value="ngo">NGO</option>
        </select>

        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <button
          onClick={loginUser}
          className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}

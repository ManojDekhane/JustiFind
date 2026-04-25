import React from "react";
import { useNavigate } from "react-router-dom";

const MythFactCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      // onClick={() => navigate(`/myth/${item.slug}`)}
      onClick={() => navigate(`/myth/${item.link.split("/").pop()}`)}
      className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
    >
      <img
        src={item.image}
        alt={item.name}
        className="h-48 w-full object-cover group-hover:scale-105 transition"
      />

      <div className="p-5">
        {/* <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
        <p className="text-gray-600 text-sm">{item.short}</p> */}

        <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
        <p className="text-gray-600 text-sm">Click to explore myth vs fact</p>

        <div className="mt-4 text-primary font-medium">
          Read More →
        </div>
      </div>
    </div>
  );
};

export default MythFactCard;
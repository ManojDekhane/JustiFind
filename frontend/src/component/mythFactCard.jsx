import React from "react";
import { useNavigate } from "react-router-dom";
const FlowerCard = ({ name, description, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Generate a clean URL slug (replace spaces with dashes)
    const topic = name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/info/${topic}`);
  };
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden w-96 sm:w-[26rem] mx-auto">
      <img
        src={image}
        alt={name}
         onClick={handleClick}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-sky-700">{name}</h3>
        <p className="text-gray-700 mt-3 text-base">{description}</p>
      </div>
    </div>
  );
};

export default FlowerCard;

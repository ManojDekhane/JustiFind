// src/components/FlowerPage.jsx
import React from "react";
import { flowerData } from "../localData/mythFactData";
import FlowerCard from "../component/mythFactCard";
import Navbar from "../component/Navbar";

const FlowerPage = () => {
  return (
    <div className="min-h-screen bg-white min-h-screen py-10">
        
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-sky-600 mb-10">Myths vs Facts</h1>
        <p className="text-sky blue-mt-2">
          
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {flowerData.map((flower) => (
          <FlowerCard
            key={flower.id}
            name={flower.name}
            description={flower.description}
            image={flower.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FlowerPage;

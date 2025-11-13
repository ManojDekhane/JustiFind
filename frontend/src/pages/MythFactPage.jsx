import React from "react";
import { mythFactTopicData } from "../localData/mythFactTopicData";
import MythFactCard from "../component/MythFactCard";
import Navbar from "../component/Navbar";

const MythFactPage = () => {
  return (
    <div className="min-h-screen bg-white py-10">
        
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600 mb-10">Myths vs Facts</h1>
        <p className="text-sky blue-mt-2">
          
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {mythFactTopicData.map((flower) => (
          <MythFactCard
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

export default MythFactPage;

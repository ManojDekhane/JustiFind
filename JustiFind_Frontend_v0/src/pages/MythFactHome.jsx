import React, { useState } from "react";
import { mythFactTopicData } from "../localData/mythFactTopicData";
import MythFactCard from "../components/MythFactCard";

const MythFactHome = () => {
  const [search, setSearch] = useState("");

  const filtered = mythFactTopicData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-6 py-10">

      {/* HERO */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-primary mb-4">
          Myths vs Facts ⚖️
        </h1>
        <p className="text-gray-600 text-lg">
          Breaking legal misconceptions with clarity and truth
        </p>
      </div>

      {/* SEARCH */}
      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search legal myths..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-xl border shadow-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <MythFactCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MythFactHome;
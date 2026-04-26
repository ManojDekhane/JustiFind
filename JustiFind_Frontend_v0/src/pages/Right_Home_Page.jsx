import { categoriesData } from "../localData/categoriesData";
import CategoryCard from "../components/Category_card";

export default function RightsHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6 md:p-12">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Know Your Rights ⚖️
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categoriesData.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>

    </div>
  );
}
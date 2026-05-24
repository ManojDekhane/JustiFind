import { useNavigate } from "react-router-dom";

export default function CategoryCard({ category }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/rights/category/${category.id}`)}
      className="group bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer
      hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Icon */}
      <div className="text-4xl mb-3 group-hover:scale-110 transition">
        {category.icon}
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800">
        {category.title}
      </h2>

      {/* Subtitle */}
      <p className="text-gray-500 text-sm mt-2">
        Explore your legal protections
      </p>

      {/* Arrow */}
      <div className="mt-4 text-blue-500 font-medium text-sm">
        View rights →
      </div>
    </div>
  );
}
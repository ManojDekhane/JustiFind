import { useParams, useNavigate } from "react-router-dom";
import { rightsData } from "../localData/Rights_data";

export default function RightsCategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  const filtered = rightsData.filter(
    (item) => item.category === category
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold capitalize text-gray-800">
          {category} Rights
        </h1>
        <p className="text-gray-500 mt-1">
          Common legal situations and solutions
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-5 max-w-4xl">

        {filtered.map((item) => (
          <div
            key={item.slug}
            onClick={() => navigate(`/rights/${item.slug}`)}
            className="bg-white border rounded-xl p-5 cursor-pointer
            hover:shadow-lg hover:border-blue-400 transition"
          >

            <h2 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h2>


            <div className="mt-3 text-blue-600 text-sm font-medium">
              View details →
            </div>

          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No rights found in this category
          </div>
        )}

      </div>

    </div>
  );
}
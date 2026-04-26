import { useParams, useNavigate } from "react-router-dom";
import { lawData } from "../localData/lawData";
import { useEffect } from "react";

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  const filteredLaws = lawData.filter(
    (law) => law.category?.toLowerCase() === category.toLowerCase()
  );

  const categoryName =
    lawData.find((law) => law.category === category)?.categoryName ||
    category.replace(/-/g, " ");

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-2 capitalize">
        {categoryName}
      </h1>

      <p className="text-gray-500 mb-6">
        {filteredLaws.length} laws available
      </p>

      {filteredLaws.length === 0 ? (
        <p>No laws found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredLaws.map((law) => (
            <div
              key={law.id}
              onClick={() => navigate(`/law/${law.id}`)}
              className="p-6 bg-white rounded-xl shadow cursor-pointer hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {law.title}
              </h2>

              <p className="text-sm text-gray-500 mb-2">
                {law.section}
              </p>

              <p className="text-gray-600 line-clamp-3">
                {law.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
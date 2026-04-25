import { useParams } from "react-router-dom";
import { lawData } from "../localData/lawData";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const filteredLaws = lawData.filter(
    (law) => law.category === category
  );

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {category.replace("-", " ")}
      </h1>

      {filteredLaws.length === 0 ? (
        <p>No laws found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredLaws.map((law) => (
            <div
              key={law.id}
              onClick={() => navigate(`/law/${law.id}`)}
              className="p-6 rounded-xl shadow cursor-pointer hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold">{law.title}</h2>
              <p className="text-gray-600 mt-2">{law.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
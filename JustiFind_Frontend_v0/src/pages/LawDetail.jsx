import { useParams } from "react-router-dom";
import { lawData } from "../localData/lawData";

const LawDetail = () => {
  const { id } = useParams();

  const law = lawData.find((item) => item.id === Number(id));

  if (!law) return <div>Not Found</div>;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">{law.title}</h1>

      <p className="text-sm text-gray-500 mb-2">
        Section: {law.section}
      </p>

      <p className="text-lg">{law.description}</p>

      <button>Explain this law</button>

    </div>
  );
};

export default LawDetail;
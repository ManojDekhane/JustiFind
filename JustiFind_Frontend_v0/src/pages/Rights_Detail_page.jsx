import { useParams } from "react-router-dom";
import { rightsData } from "../localData/Rights_data";

export default function RightsDetail() {
  const { slug } = useParams();

  const data = rightsData.find((item) => item.slug === slug);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        No data found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">

      {/* Title */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          {data.title}
        </h1>

        {/* Situation */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Situation
          </h2>
          <p className="text-gray-600 mt-2">{data.situation}</p>
        </div>

        {/* Rights */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Your Rights
          </h2>

          <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-600">
            {data.rights.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Steps to Take
          </h2>

          <ol className="list-decimal ml-5 mt-2 space-y-1 text-gray-600">
            {data.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>

        {/* Laws */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Relevant Laws
          </h2>

          <div className="flex flex-wrap gap-2 mt-2">
            {data.laws.map((l, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {l}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
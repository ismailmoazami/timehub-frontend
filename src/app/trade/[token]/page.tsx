// app/trade/[token]/page.tsx
type TokenPageProps = {
  params: { token: string };
};

const TOKENS = {
  toly: {
    name: "Toly",
    image: "/images/toly.png",
    price: 10,
    description: "Toly is a sample token with unique features.",
  },
  james: {
    name: "James",
    image: "/images/james.png",
    price: 15,
    description: "James is another sample token with great potential.",
  },
  // Add more tokens as needed
};

export default async function TokenPage({ params }: TokenPageProps) {
  
  const response = await fetch(`http://localhost:8000/time_market_data/${params.token}`)
  const tokenData = await response.json() 

  if (!tokenData) {
    return <div className="text-center text-red-500">Token not found.</div>;
  }

  return (
    <div className="bg-[#D2C4C4] min-h-screen flex items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-4xl p-6">
        {/* Image Section */}
        <div className="flex-shrink-0 flex justify-center items-center w-full md:w-1/3">
          <img
            src={tokenData.image}
            alt={tokenData.name}
            className="rounded-lg object-cover w-full max-w-[300px]"
          />
        </div>

        {/* Content Section */}
        <div className="flex-grow mt-6 md:mt-0 md:ml-6">
          <h1 className="text-3xl font-bold text-gray-800">{tokenData.name}</h1>
          <p className="text-xl text-gray-600 mt-2">${tokenData.price} per minute</p>
          <p className="text-gray-700 mt-4">{tokenData.description}</p>

          {/* Interaction Section */}
          <div className="flex items-center mt-6">
            <label className="text-gray-600 mr-4">Minutes:</label>
            <input
              type="number"
              defaultValue={20}
              className="border border-gray-300 rounded px-3 py-2 w-20 text-center"
            />
          </div>
          <div className="flex mt-6 gap-4">
            <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition">
              Buy
            </button>
            <button className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition">
              Sell
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

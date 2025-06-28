import TimeMarketCard from "@/components/TimeMarketCard";

export default async function Home() {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/time_markets_data`, {
    cache: "no-store"
  })
  const data = await response.json()

  console.log(`data: ${data}`)
  console.log(`data: ${JSON.stringify(data, null, 2)}`);

  return (
    <div className="bg-[#D2C4C4] p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-black">Time Markets</h1>
      <div className="flex flex-wrap justify-center gap-6 bg-[#D2C4C4] p-8">
      
        {data.map((item: {name: string; image: string; price: number; x: string; link: string}) => (
        <TimeMarketCard
        key={item.name}
        imageSrc={item.image}
        name={item.name}
        price={item.price} 
        link={`/trade/${item.x}`} 
        />    
        ))}
      </div>
    </div>
  );
}

import TimeMarketCard from "@/components/TimeMarketCard";

export default function Home() {
  return (
    <div className="bg-[#D2C4C4] p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-black">Time Markets</h1>
      <div className="flex flex-wrap justify-center gap-6 bg-[#D2C4C4] p-8">
        <TimeMarketCard imageSrc="/simon.jpg" name="Simon" price={10} />
        <TimeMarketCard imageSrc="/simon.jpg" name="Jesse" price={15} />
        <TimeMarketCard imageSrc="/simon.jpg" name="Jesse" price={15} />
        <TimeMarketCard imageSrc="/simon.jpg" name="Jesse" price={15} />
        <TimeMarketCard imageSrc="/simon.jpg" name="Jesse" price={15} />
        <TimeMarketCard imageSrc="/simon.jpg" name="Jesse" price={15} />
        <TimeMarketCard imageSrc="/simon.jpg" name="Jesse" price={15} />
        <TimeMarketCard imageSrc="/simon.jpg" name="Jesse" price={15} />
        <TimeMarketCard imageSrc="/simon.jpg" name="Jesse" price={15} />
        <TimeMarketCard imageSrc="/simon.jpg" name="Jesse" price={15} />
      </div>
    </div>
  );
}

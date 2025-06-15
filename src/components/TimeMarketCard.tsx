import Image from "next/image"

// Define the interface for the component props
interface TimeMarketCardProps {
    name: string;
    imageSrc: string;
    price: number;
}

export default function TimeMarketCard({ name, imageSrc, price }: TimeMarketCardProps) {
    return (
        <div className="flex flex-col bg-white shadow-lg rounded-lg p-4 w-64 mt-2 ml-2">
            <Image src={imageSrc} alt="Time Market image" width={200} height={200} className="rounded-t-lg mx-auto" />
            <div className="mt-3 px-3 text-left">
                <p className="text-lg font-semibold">{name}</p>
                <p className="text-base text-gray-600 mt-1">${price}</p>
            </div>
        </div>
    )
}


import Image from "next/image"

// Define the interface for the component props
interface TimeMarketCardProps {
    name: string;
    imageSrc: string;
    price: number;
    link: string;
}

export default function TimeMarketCard({ name, imageSrc, price, link }: TimeMarketCardProps) {
    return (
        <div className="flex flex-col bg-white shadow-lg rounded-lg p-4 w-64 mt-2 ml-2">
            <a href={link}>
            <Image src={imageSrc} alt="Time Market image" width={200} height={200} className="rounded-t-lg mx-auto" />
            </a>
            <div className="mt-3 px-3 text-left">
                <p className="text-lg font-semibold">{name}</p>
                <p className="text-base text-gray-600 mt-1">${price}</p>
                <a href={link} className="mt-3 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">
                    Buy
                </a>
            </div>
        </div>
    )
}

